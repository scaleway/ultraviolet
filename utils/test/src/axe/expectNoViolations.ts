import { expect } from 'vitest'
import { axe } from 'vitest-axe'
import type { AxeCore } from 'vitest-axe'

const defaultResult: AxeCore.AxeResults = {
  testEngine: {
    name: '',
    version: '',
  },
  testRunner: {
    name: '',
  },
  testEnvironment: {
    userAgent: 'userAgent',
    windowWidth: 0,
    windowHeight: 0,
  },
  url: 'string',
  timestamp: '',
  toolOptions: {},
  passes: [],
  violations: [],
  incomplete: [],
  inapplicable: [],
}
/**
 * https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
 */
const rules: AxeCore.RuleObject = {
  'color-contrast-enhanced': {
    enabled: true,
  },
  'identical-links-same-purpose': {
    enabled: true,
  },
} as const

const defaultAxeOptions: AxeCore.RunOptions = {
  performanceTimer: false,
  reporter: 'v2',
  rules,
} as const

const expectNoViolations = async (container: string | Element, options = defaultAxeOptions) => {
  const axeResult = await axe(container, options)
  expect(axeResult).toHaveNoViolations()
}

export { defaultResult, defaultAxeOptions, expectNoViolations }
