import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import {
  consoleLightTheme,
  consoleDarkTheme,
  consoleDarkerTheme,
} from '@ultraviolet/themes'
import { renderWithTheme } from '@utils/test'
import { describe, test, expect } from 'vitest'
import { axe } from 'vitest-axe'

import { Button } from '..'

const themes = [
  ['light', consoleLightTheme],
  ['dark', consoleDarkTheme],
  ['darker', consoleDarkerTheme],
] as const

describe('button - A11y', () => {
  test.each(themes)(
    'should render with default props  theme %s ',
    async (_, currentTheme) => {
      const { container } = renderWithTheme(
        <Button disabled onClick={() => {}}>
          <PencilIcon />
          Hello
        </Button>,
        currentTheme,
      )

      const res = await axe(container)
      expect(res).toHaveNoViolations()
    },
  )

  test.todo.each(themes)(
    'should render with tooltips propstheme %s ',
    async (_, currentTheme) => {
      const { container } = renderWithTheme(
        <Button tooltip="toto">Hello</Button>,
        currentTheme,
      )

      const res = await axe(container)
      expect(res).toHaveNoViolations()
    },
  )
})
