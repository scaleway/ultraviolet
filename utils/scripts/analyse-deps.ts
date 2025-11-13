import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const args = process.argv.slice(2)

const srcDir = path.join(cwd, args[0] ?? 'packages/ui/src/components')

type DependencyGraph = {
  [componentName: string]: {
    dependsOn: string[]
  }
}

const graph: DependencyGraph = {}

const walk = (dir: string): string[] => {
  const results = []
  const list = fs.readdirSync(dir)

  for (const file of list) {
    const filePath = path.join(dir, file)

    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      const subDirResult = walk(filePath)

      results.push(...subDirResult)
    } else {
      results.push(filePath)
    }
  }

  return results
}

const filesToAnalyze = walk(srcDir)

for (const file of filesToAnalyze) {
  if (
    (file.endsWith('.ts') || file.endsWith('.tsx')) &&
    !['stories.tsx', 'test.tsx'].some(end => file.endsWith(end))
  ) {
    const relativePath = path.relative(srcDir, file)
    const componentName = relativePath.split('/')[0]

    const content = fs.readFileSync(file, 'utf8')

    const matches = content.matchAll(
      /import\s+(?:.*?from\s+)?(['"])(.*?)(['"])|export\s+{?\s*(\w+)?\s*}?$/g,
    )

    for (const match of matches) {
      const importedFile = match[2] || null
      if (importedFile) {
        const normalizedFile = path
          .relative(srcDir, path.join(path.dirname(file), importedFile))
          .replace(/\.tsx?$/, '')

        if (
          ![
            'react',
            'react-vite',
            'vitest',
            'styled',
            '@emotion/styled',
            'components/',
          ].some(string => normalizedFile.endsWith(string))
        ) {
          const importedComponent = normalizedFile.split('/').toReversed()[0]

          if (!graph[componentName]) {
            graph[componentName] = { dependsOn: [] }
          }

          if (importedComponent !== componentName) {
            const { dependsOn } = graph[componentName]
            const newDeps = [...new Set([...dependsOn, importedComponent])]
            graph[componentName].dependsOn = newDeps
          }
        }
      }
    }
  }
}

const sortGraphByDependencySize = ({
  currentGraph,
  order = 'asc',
}: {
  currentGraph: DependencyGraph
  order?: 'asc' | 'desc'
}) => {
  const entries = Object.entries(currentGraph)

  entries.sort((a, b) => {
    const aSize = a[1].dependsOn.length
    const bSize = b[1].dependsOn.length

    return order === 'asc' ? bSize - aSize : aSize - bSize
  })

  return {
    order,
    sortedComponent: entries,
  }
}

const sortedComponent = sortGraphByDependencySize({
  currentGraph: graph,
  order: 'desc',
})

const { info } = console
info('sortedComponent', JSON.stringify(graph, null, 2))
fs.writeFileSync('deps.json', JSON.stringify(sortedComponent, null, 2))

const componentNames = new Set(
  sortedComponent.sortedComponent.map(([name]) => name),
)
const asRecord = Object.fromEntries(
  sortedComponent.sortedComponent
    .map(([name, count]) => {
      const { dependsOn } = count as { dependsOn: string[] }
      const filteredDeps = dependsOn.filter(dependency =>
        componentNames.has(dependency),
      )

      return [name, filteredDeps.length] as const
    })
    .toSorted(([, aCount], [, bCount]) => aCount - bCount),
)

fs.writeFileSync('depsFiltered.json', JSON.stringify(asRecord, null, 2))
