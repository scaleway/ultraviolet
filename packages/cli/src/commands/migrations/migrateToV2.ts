import * as fs from 'node:fs'
import * as path from 'node:path'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import { parse as recastParse, print as recastPrint } from 'recast'

const kebabCaseToPasarCase = (kebabCase: string) =>
  kebabCase
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')

// Function to convert icon name to component name
const convertIconName = (iconName: string) =>
  `${kebabCaseToPasarCase(iconName)}Icon`

// Define the components and their deprecated props
const components: { [key: string]: string[] } = {
  Button: ['icon', 'iconPosition', 'iconVariant'],
  Badge: ['icon'],
  Bullet: ['icon', 'iconVariant'],
  AvatarV2: ['icon'],
  Separator: ['icon'],
  Tag: ['icon'],
} as const

// Define the new sizes mapping
const sizeMapping: { [key: string]: string } = {
  small: 'small',
  large: 'medium',
  xlarge: 'xlarge',
  xxlarge: 'xxlarge',
} as const

// Function to update the component usage
function updateComponentUsage(fileContent: string): string {
  const ast = recastParse(fileContent, {
    parser: {
      parse(source: string) {
        return parse(source, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
        })
      },
    },
  })

  const imports: Set<string> = new Set()

  traverse(ast, {
    JSXOpeningElement(path) {
      const openingElement = path.node
      const componentName = (openingElement.name as t.JSXIdentifier).name

      if (components[componentName]) {
        components[componentName].forEach(deprecatedProp => {
          const attributeIndex = openingElement.attributes.findIndex(
            attr =>
              t.isJSXAttribute(attr) &&
              t.isJSXIdentifier(attr.name) &&
              attr.name.name === deprecatedProp,
          )

          if (attributeIndex !== -1) {
            const attribute = openingElement.attributes[
              attributeIndex
            ] as t.JSXAttribute

            if (
              deprecatedProp === 'icon' &&
              t.isStringLiteral(attribute.value)
            ) {
              const iconName = attribute.value.value
              const hasOutlinedVariant = openingElement.attributes.some(
                attr =>
                  t.isJSXAttribute(attr) &&
                  t.isJSXIdentifier(attr.name) &&
                  attr.name.name === 'iconVariant' &&
                  t.isStringLiteral(attr.value) &&
                  attr.value.value === 'outlined',
              )
              const newName = `${convertIconName(iconName)}${hasOutlinedVariant ? 'Outline' : ''}`
              imports.add(newName)

              // Remove the deprecated icon attribute
              openingElement.attributes.splice(attributeIndex, 1)

              // Add the new icon component as a child
              const newIconElement = t.jsxElement(
                t.jsxOpeningElement(t.jsxIdentifier(newName), [], true),
                null,
                [],
                true,
              )

              if (path.parentPath.isJSXElement()) {
                const parentElement = path.parentPath.node
                parentElement.children.unshift(newIconElement)
              }
            } else {
              // Remove the deprecated attribute
              openingElement.attributes.splice(attributeIndex, 1)
            }
          }
        })
      }
    },
  })

  if (imports.size > 0) {
    const importDeclaration = t.importDeclaration(
      Array.from(imports).map(importName =>
        t.importSpecifier(t.identifier(importName), t.identifier(importName)),
      ),
      t.stringLiteral('@ultraviolet/icons'),
    )

    ast.program.body.unshift(importDeclaration)
  }

  return recastPrint(ast).code
}

// Function to update the size usage
function updateSizeUsage(fileContent: string): string {
  const ast = recastParse(fileContent, {
    parser: {
      parse(source: string) {
        return parse(source, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
        })
      },
    },
  })

  traverse(ast, {
    JSXAttribute(path) {
      if (t.isJSXIdentifier(path.node.name) && path.node.name.name === 'size') {
        const attributeValue = path.node.value
        if (t.isStringLiteral(attributeValue)) {
          const newSize = sizeMapping[attributeValue.value]
          if (newSize) {
            path.node.value = t.stringLiteral(newSize)
          }
        }
      }
    },
  })

  return recastPrint(ast).code
}

// Function to process each file in the codebase
function processFiles(directory: string): void {
  fs.readdirSync(directory).forEach(file => {
    const filePath = path.join(directory, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      if (file !== 'node_modules') {
        processFiles(filePath)
      }
    } else if (
      filePath.endsWith('.js') ||
      filePath.endsWith('.ts') ||
      filePath.endsWith('.jsx') ||
      filePath.endsWith('.tsx')
    ) {
      let fileContent = fs.readFileSync(filePath, 'utf8')

      fileContent = updateComponentUsage(fileContent)
      fileContent = updateSizeUsage(fileContent)

      fs.writeFileSync(filePath, fileContent, 'utf8')
    }
  })
}

// Export the migrate function
export function migrateToV2(directory: string): void {
  processFiles(directory)
  console.log('Migration to v2 completed successfully.')
}
