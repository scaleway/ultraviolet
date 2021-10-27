import type { Meta } from '@storybook/react'
import { composeStories } from '@storybook/testing-react'
import { cleanup } from '@testing-library/react'
import fs from 'fs'
import { axe, toHaveNoViolations } from 'jest-axe'
import * as path from 'path'
import React, { VoidFunctionComponent } from 'react'
import { renderWithTheme } from '../helpers/jestHelpers'

const foundFiles: string[] = []

const searchFileFromDir = (startPath: string, filter: string) => {
  const files = fs.readdirSync(startPath)

  for (let i = 0; i < files.length; i += 1) {
    const filename = path.join(startPath, files[i])
    const stat = fs.lstatSync(filename)

    if (stat.isDirectory()) {
      // recursive search in case if directory
      searchFileFromDir(filename, filter)
    } else if (filename.indexOf(filter) >= 0) {
      foundFiles.push(filename.replace('src/', '../'))
    }
  }
}

searchFileFromDir('src/components', '.stories.tsx')

expect.extend(toHaveNoViolations)

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
            componentName
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
