// axe-core is used directly instead of vitest-axe's runner: vitest-axe uses `createRequire`,
// which doesn't exist in Vitest Browser Mode. The `toHaveNoViolations` matcher stays from vitest-axe.
import axe from 'axe-core'
import { expect } from 'vitest'
import type { AxeCore } from 'vitest-axe'

/**
 * https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
 */
const rules: AxeCore.RuleObject = {
  'identical-links-same-purpose': {
    enabled: true,
  },

  'color-contrast-enhanced': {
    /*
     * the neutral.textWeak token used for secondary text sits around 5.4:1 (WCAG AA compliant). Re-enable when the theme tokens pass AAA.
     **/
    enabled: false,
  },
  'meta-refresh-no-exceptions': {
    enabled: true,
  },
} as const

const defaultAxeOptions: AxeCore.RunOptions = {
  performanceTimer: false,
  reporter: 'v2',
  rules,
} as const

const expectNoViolations = async (container: string | Element, customOptions: AxeCore.RunOptions = {}) => {
  const opts = {
    ...customOptions,
    ...defaultAxeOptions,
  } satisfies AxeCore.RunOptions

  const axeResult = await axe.run(container, opts)
  expect(axeResult).toHaveNoViolations()
}

export { expectNoViolations }
