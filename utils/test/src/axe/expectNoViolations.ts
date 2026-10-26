import axe from 'axe-core'
import { expect } from 'vitest'

type RuleObject = axe.RunOptions['rules']
/**
 * https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
 */
const rules: RuleObject = {
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

const defaultAxeOptions: axe.RunOptions = {
  performanceTimer: false,
  reporter: 'v2',
  rules,
} as const

const expectNoViolations = async (container: string | Element, customOptions: axe.RunOptions = {}) => {
  const opts = {
    ...customOptions,
    ...defaultAxeOptions,
  } satisfies axe.RunOptions

  const axeResult = await axe.run(container, opts)
  expect(axeResult).toHaveNoViolations()
}

export { expectNoViolations }
