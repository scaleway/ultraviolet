import type { Meta } from '@storybook/react'
import { composeStories } from '@storybook/testing-react'
import { cleanup } from '@testing-library/react'
import fs from 'fs'
import { axe, toHaveNoViolations } from 'jest-axe'
import * as path from 'path'
import * as process from 'process'
import { renderWithTheme } from '../../.jest/helpers'

const testedComponents = [
  'Alert',
  'Avatar',
  'Loader',
  'Badge',
  'Bullet',
  'Button',
  'Carousel',
  'Checkbox',
  'MarkDown',
  'Skeleton',
  'Separator',
  'Sphere',
  'Stack',
  'Status',
  'Stepper',
  'Switch',
  'SelectableCard',
  'StepList',
  'Toaster',
  'Tag',
  'TagInput',
  'TextInput',
  'Radio',
]

const foundFiles: string[] = []

const searchFileFromDir = (startPath: string, filter: string) => {
  const files = fs.readdirSync(startPath)

  for (let i = 0; i < files.length; i += 1) {
    const fileName = files[i]
    const filePath = path.join(startPath, fileName)
    const stat = fs.lstatSync(filePath)

    if (stat.isDirectory()) {
      // recursive search in case if directory
      searchFileFromDir(filePath, filter)
    } else if (filePath.includes(filter)) {
      const isTested = testedComponents.some(component =>
        filePath.match(`^packages/ui/src/components/${component}/`),
      )

      if (isTested) {
        foundFiles.push(filePath.replace('packages/ui/src/', '../'))
      }
    }
  }
}
// Check if a path was given as input argument, if not we check all stories
if (process.argv[4]) {
  searchFileFromDir(process.argv[4], '.stories.tsx')
} else {
  searchFileFromDir('packages/ui/src/components', '.stories.tsx')
}

expect.extend(toHaveNoViolations)

jest.setTimeout(120000)

describe('A11y', () => {
  beforeEach(() => {
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
  })

  afterEach(() => {
    cleanup()
  })

  const moduleArray: Promise<{
    default: Meta
    __esModule?: boolean
  }>[] = []

  beforeAll(async () => {
    for (const file of foundFiles) {
      // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-unsafe-argument
      moduleArray.push(await import(file))
    }
  })

  foundFiles.forEach((file, index) => {
    describe(`${file.split('/')[2]}`, () =>
      test(file.split('/')[4].split('.')[0], async () => {
        const module = await moduleArray[index]
        const components = composeStories(module)

        for (const componentName of Object.keys(components)) {
          if (componentName !== 'default') {
            const ComponentToRender = components[
              componentName as keyof typeof components
            ] as () => JSX.Element
            const { container } = renderWithTheme(<ComponentToRender />)
            // eslint-disable-next-line no-await-in-loop
            const results = await axe(container)

            expect(results).toHaveNoViolations()
          }
        }
      }))
  })
})
