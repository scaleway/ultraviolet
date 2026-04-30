import {
  consoleLightTheme,
  consoleDarkTheme,
  consoleDarkerTheme,
} from '@ultraviolet/themes'
import { renderWithTheme } from '@utils/test'
import { describe, test, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { CopyButton } from '..'

const themes = [
  ['light', consoleLightTheme],
  ['dark', consoleDarkTheme],
  ['darker', consoleDarkerTheme],
] as const

describe('copy button - A11y', () => {
  test.each(themes)(
    'should render with default props  theme %s ',
    async (_, currentTheme) => {
      const { container } = renderWithTheme(
        <CopyButton value="copy" />,
        currentTheme,
      )

      const res = await axe(container)
      expect(res).toHaveNoViolations()
    },
  )
})
