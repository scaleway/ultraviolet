#!/usr/bin/env node

// oxlint-disable eslint/no-console
// oxlint-disable eslint/max-statements
// biome-ignore-all lint/style/noNonNullAssertion: error

import { createHash } from 'node:crypto'
import fs, {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDirname = dirname(fileURLToPath(import.meta.url))

type FileInfo = {
  path: string
  size: number
  checksum: string
}

type PackageInfo = {
  files: FileInfo[]
  total_files: number
  total_size: number
}

type Manifest = {
  timestamp: string
  vite_version: string
  packages: Record<string, PackageInfo>
}

// Configuration
const MONOREPO_ROOT = resolve(currentDirname, '../../../')
const PACKAGES_DIR = join(MONOREPO_ROOT, 'packages')
const OUTPUT_DIR = join(MONOREPO_ROOT, '.dist-comparison')
const BASELINE_FILE = join(OUTPUT_DIR, 'baseline-manifest.json')
const CURRENT_FILE = join(OUTPUT_DIR, 'current-manifest.json')
const REPORT_FILE = join(OUTPUT_DIR, 'migration-comparison-report.txt')

// Colors for output
const RED = '\u001B[0;31m'
const GREEN = '\u001B[0;32m'
const YELLOW = '\u001B[1;33m'
const NC = '\u001B[0m' // No Color

function getAllFiles(dirPath: string, relativeTo: string): FileInfo[] {
  const files: FileInfo[] = []
  function scan(dir: string): void {
    const items = readdirSync(dir)
    for (const item of items) {
      const fullPath = join(dir, item)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        scan(fullPath)
      } else {
        files.push({
          checksum: createHash('sha256')
            .update(readFileSync(fullPath))
            .digest('hex'),
          path: relative(relativeTo, fullPath),
          size: stat.size,
        })
      }
    }
  }
  scan(dirPath)

  return files
}

function generateManifest(outputFile: string): void {
  const packages = fs
    .readdirSync(PACKAGES_DIR)
    .filter(item => statSync(join(PACKAGES_DIR, item)).isDirectory())
  console.log(`Generating manifest for ${packages.length} packages...`)

  const manifest: Manifest = {
    packages: {} as Record<string, PackageInfo>,
    timestamp: new Date().toISOString(),
    vite_version: '8.0.0-beta.2',
  }

  for (const pkg of packages) {
    const packageDist = join(PACKAGES_DIR, pkg, 'dist')
    if (existsSync(packageDist)) {
      console.log(`  Processing ${pkg}...`)
      const files = getAllFiles(packageDist, packageDist)
      manifest.packages[pkg] = {
        files,
        total_files: files.length,
        total_size: files.reduce((sum, f) => sum + f.size, 0),
      }
    } else {
      console.log(`  Warning: No dist folder for ${pkg}`)
    }
  }

  writeFileSync(outputFile, JSON.stringify(manifest, null, 2))
}

function compareManifests(
  baselinePath: string,
  currentPath: string,
  reportPath: string,
): void {
  console.log('Comparing manifests...')
  // oxlint-disable-next-line typescript/no-unsafe-assignment
  const baseline: Manifest = JSON.parse(readFileSync(baselinePath, 'utf8'))
  // oxlint-disable-next-line typescript/no-unsafe-assignment
  const current: Manifest = JSON.parse(readFileSync(currentPath, 'utf8'))

  let report = 'Migration Comparison Report\n'
  report += `Generated: ${new Date().toISOString()}\n`
  report += '=================================\n'

  const baselinePackages = Object.keys(baseline.packages).toSorted()
  const currentPackages = Object.keys(current.packages).toSorted()

  const newPackages = currentPackages.filter(p => !baselinePackages.includes(p))
  const missingPackages = baselinePackages.filter(
    p => !currentPackages.includes(p),
  )

  if (newPackages.length > 0) {
    report += `\n${GREEN}New packages:${NC}\n`
    report += `${newPackages.join('\n')}\n`
  }

  if (missingPackages.length > 0) {
    report += `\n${RED}Missing packages:${NC}\n`
    report += `${missingPackages.join('\n')}\n`
  }

  const commonPackages = baselinePackages.filter(p =>
    currentPackages.includes(p),
  )

  for (const pkg of commonPackages) {
    console.error(`Comparing ${pkg}...`)

    const baselineFiles = baseline.packages[pkg].files
      .map(f => f.path)
      .toSorted()
    const currentFiles = current.packages[pkg].files.map(f => f.path).toSorted()

    const newFiles = currentFiles.filter(f => !baselineFiles.includes(f))
    const missingFiles = baselineFiles.filter(f => !currentFiles.includes(f))
    const commonFiles = baselineFiles.filter(f => currentFiles.includes(f))

    let hasChanges = false

    if (newFiles.length > 0 || missingFiles.length > 0) {
      hasChanges = true
      report += `\n${YELLOW}Package: ${pkg}${NC}\n`

      if (newFiles.length > 0) {
        report += '  New files:\n'
        report += `${newFiles.map(f => `    ${f}`).join('\n')}\n`
      }

      if (missingFiles.length > 0) {
        report += '  Missing files:\n'
        report += `${missingFiles.map(f => `    ${f}`).join('\n')}\n`
      }
    }

    const modifiedFiles: string[] = []
    for (const file of commonFiles) {
      const baselineFile = baseline.packages[pkg].files.find(
        f => f.path === file,
      )!
      const currentFile = current.packages[pkg].files.find(
        f => f.path === file,
      )!
      if (baselineFile.checksum !== currentFile.checksum) {
        modifiedFiles.push(
          `${file} (${baselineFile.size} → ${currentFile.size} bytes)`,
        )
      }
    }

    if (modifiedFiles.length > 0) {
      hasChanges = true
      if (!report.includes(`Package: ${pkg}`)) {
        report += `\n${YELLOW}Package: ${pkg}${NC}\n`
      }
      report += '  Modified files:\n'
      report += `${modifiedFiles.map(f => `    ${f}`).join('\n')}\n`
    }

    if (!hasChanges) {
      console.error(`✓ ${pkg}: No changes`)
    }
  }

  writeFileSync(reportPath, report)
  console.log(`\nComparison complete. Report saved to: ${reportPath}`)
}

function main(): void {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  console.log('Starting dist comparison for Vite v6 → v8 migration...')

  // Generate current manifest
  generateManifest(CURRENT_FILE)

  // Check if baseline exists
  if (!existsSync(BASELINE_FILE)) {
    console.log(
      'No baseline manifest found. Creating one for future comparison.',
    )
    console.log('To compare with a previous version:')
    console.log('1. Run this script before migration to create baseline')
    console.log('2. Run migration')
    console.log('3. Run this script again to compare')
    copyFileSync(CURRENT_FILE, BASELINE_FILE)

    return
  }

  // Compare manifests
  compareManifests(BASELINE_FILE, CURRENT_FILE, REPORT_FILE)

  // Display summary
  console.log('\nSummary:')
  const reportContent = readFileSync(REPORT_FILE, 'utf8')
  const lines = reportContent.split('\n')
  console.log(lines.slice(-20).join('\n'))
}

main()
