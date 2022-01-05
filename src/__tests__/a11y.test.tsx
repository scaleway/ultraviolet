import type { Meta } from '@storybook/react'
import { composeStories } from '@storybook/testing-react'
import { cleanup } from '@testing-library/react'
import fs from 'fs'
import { axe, toHaveNoViolations } from 'jest-axe'
import * as path from 'path'
import * as process from 'process'
import React, { VoidFunctionComponent } from 'react'
import { renderWithTheme } from '../helpers/jestHelpers'

const testedComponents = [
  'Alert',
  'Avatar',
  'ActivityIndicator',
  'Badge',
  'Counter',
  'MarkDown',
  'Placeholder',
  'Reminder',
  'Separator',
  'StealthCopiable',
  'Stepper',
  'Toaster',
  'TooltipIcon',
  'Tag',
  'Tags',
  'ExtendedReminder',
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
    } else if (filePath.indexOf(filter) >= 0) {
      const isTested = testedComponents.some(component =>
        filePath.match(`^src/components/${component}/`),
      )

      if (isTested) {
        foundFiles.push(filePath.replace('src/', '../'))
      }
    }
  }
}

// Check if a path was given as input argument, if not we check all stories
if (process.argv[4]) {
  searchFileFromDir(process.argv[4], '.stories.tsx')
} else {
  searchFileFromDir('src/components', '.stories.tsx')
}

expect.extend(toHaveNoViolations)

jest.setTimeout(60000)

describe('A11y', () => {
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
    test(`${file.split('/')[2]}`, async () => {
      const module = await moduleArray[index]
      const components = composeStories(module)

      for (const componentName of Object.keys(components)) {
        if (componentName !== 'default') {
          const ComponentToRender = components[
            componentName as keyof typeof components
          ] as VoidFunctionComponent
          const { container } = renderWithTheme(<ComponentToRender />)
          // eslint-disable-next-line no-await-in-loop
          const results = await axe(container)

          expect(results).toHaveNoViolations()
        }
      }
    })
  })
})
