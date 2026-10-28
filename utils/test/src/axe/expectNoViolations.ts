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

/*
 * Floating UI's focus guards are visually hidden focus sentinels. On WebKit
 * they must carry role="button" without aria-hidden for VoiceOver to focus
 * them, which axe flags with aria-command-name; they are library internals,
 * not part of the audited UI (in other browsers they are aria-hidden, so
 * ignored). Excluded from every scan.
 */
const focusGuardSelector = '[data-floating-ui-focus-guard]'

const expectNoViolations = async (container: string | Element, customOptions: axe.RunOptions = {}) => {
  const opts = {
    ...customOptions,
    ...defaultAxeOptions,
  } satisfies axe.RunOptions

  const axeResult = await axe.run({ exclude: [focusGuardSelector], include: [container] }, opts)
  expect(axeResult).toHaveNoViolations()
}

export { expectNoViolations }
