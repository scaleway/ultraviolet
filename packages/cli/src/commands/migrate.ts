import * as fs from 'node:fs'
import * as path from 'node:path'
import * as semver from 'semver'

// Function to get the local version of @ultraviolet/ui
function getUltravioletUiVersion(directory: string): string | null {
  const packageJsonPath = path.resolve(
    `${directory}/node_modules/@ultraviolet/ui/package.json`,
  )
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    return packageJson.version
  }
  return null
}

// Function to dynamically import and run the correct migration file
export async function migrate(directory: string): Promise<void> {
  const version = getUltravioletUiVersion(directory)
  if (version) {
    const majorVersion = semver.major(version) + 1
    try {
      const migrationModulePath = `./migrations/migrateToV${majorVersion}`
      console.log(`Loading migration script: ${migrationModulePath}`)
      const migrationModule = await import(migrationModulePath)
      const migrateFunctionName = `migrateToV${majorVersion}`
      if (
        migrationModule &&
        typeof migrationModule[migrateFunctionName] === 'function'
      ) {
        migrationModule[migrateFunctionName](directory)
      } else {
        console.error(
          `Migration function ${migrateFunctionName} not found in ${migrationModulePath}.`,
        )
      }
    } catch (error) {
      console.error(
        `Error loading migration script for @ultraviolet/ui@${majorVersion}.x.x:`,
        error,
      )
    }
  } else {
    console.error('@ultraviolet/ui is not installed in the project.')
  }
}
