export type AxeOptions = {
  /**
   * Rules to exclude from testing
   * @example ['color-contrast', 'empty-heading']
   */
  excludeRules?: string[]
  /**
   * Only run specific rules
   * @example ['label', 'button-name']
   */
  onlyRules?: string[]
  /**
   * Rules that should pass (will fail if they don't)
   * @example ['label', 'button-name']
   */
  requiredRules?: string[]
}

/**
 * Test a React component for accessibility violations using axe-core
 *
 * Make sure to import axe-core in your test setup:
 * ```ts
 * // vitest.setup.ts
 * import { toHaveNoViolations } from 'axe-core'
 * import { expect } from 'vitest'
 * expect.extend(toHaveNoViolations)
 * ```
 *
 * @example
 * ```tsx
 * import { axe } from 'axe-core'
 * import { expect } from 'vitest'
 *
 * it('should have no accessibility violations', async () => {
 *   const { container } = render(<Button>Click me</Button>)
 *   const results = await axe(container)
 *   expect(results).toHaveNoViolations()
 * })
 * ```
 *
 * @example
 * ```tsx
 * // With custom options
 * it('should have no critical violations', async () => {
 *   const { container } = render(<MyComponent />)
 *   const results = await axe(container, {
 *     runOnly: {
 *       type: 'tag',
 *       values: ['wcag2a', 'wcag2aa']
 *     }
 *   })
 *   expect(results).toHaveNoViolations()
 * })
 * ```
 */
export const expectAxeToPass = async (
  _container: Element | Document,
  _options?: AxeOptions,
): Promise<void> => {
  // This is a type-safe wrapper - actual implementation requires axe-core
  // Import axe-core directly in your tests:
  // import { axe } from 'axe-core'
  // const results = await axe(container, options)
  // expect(results).toHaveNoViolations()

  throw new Error(
    'axe-core is not installed. Install it with: pnpm add -D axe-core',
  )
}

/**
 * Check for specific accessibility issues
 *
 * @example
 * ```tsx
 * import { axe } from 'axe-core'
 *
 * const { container } = render(<MyComponent />)
 * const results = await axe(container)
 *
 * expect(results.violations).toHaveLength(0)
 * expect(results.passes.some(r => r.id === 'label')).toBe(true)
 * ```
 */
export const checkAccessibility = async (
  _container: Element | Document,
  _options?: AxeOptions,
): Promise<AxeResults> => {
  throw new Error(
    'axe-core is not installed. Install it with: pnpm add -D axe-core',
  )
}

export type AxeResults = {
  violations: Array<{
    id: string
    description: string
    help: string
    helpUrl: string
    impact: 'minor' | 'moderate' | 'serious' | 'critical'
    nodes: Array<{
      html: string
      target: string[]
      failureSummary: string
    }>
  }>
  passes: Array<{
    id: string
    description: string
    help: string
    helpUrl: string
    nodes: Array<{
      html: string
      target: string[]
    }>
  }>
  incomplete: Array<{
    id: string
    description: string
    help: string
    helpUrl: string
    nodes: Array<{
      html: string
      target: string[]
    }>
  }>
  inapplicable: Array<{
    id: string
    description: string
    help: string
    helpUrl: string
  }>
}

/**
 * Common accessibility test patterns
 *
 * @example
 * ```tsx
 * import { axe } from 'axe-core'
 * import { expect } from 'vitest'
 *
 * it('passes standard a11y checks', async () => {
 *   const { container } = render(<MyComponent />)
 *   const results = await axe(container)
 *   expect(results).toHaveNoViolations()
 * })
 * ```
 */
export const a11y = {
  /**
   * Standard accessibility test - should have no violations
   * Run this for all components
   */
  standard: 'Use axe(container) directly in your tests',

  /**
   * Quick test - only check critical rules
   * Good for snapshot testing or when you need faster tests
   */
  quickRules: [
    'button-name',
    'label',
    'link-name',
    'image-alt',
    'form-field-multiple-labels',
    'input-button-name',
    'select-name',
    'textarea-name',
  ],

  /**
   * Visual test rules - check color contrast and visual issues
   */
  visualRules: [
    'color-contrast',
    'link-in-text-block',
    'css-orientation-lock',
    'meta-viewport',
  ],

  /**
   * Keyboard test rules - check keyboard accessibility
   */
  keyboardRules: [
    'keyboard',
    'focus-order-semantics',
    'tabindex',
    'focus-visible',
    'accesskeys',
  ],

  /**
   * ARIA test rules - check ARIA usage
   */
  ariaRules: [
    'aria-allowed-attr',
    'aria-hidden-body',
    'aria-required-attr',
    'aria-roles',
    'aria-valid-attr',
    'aria-valid-attr-value',
    'button-has-visible-text',
    'definition-list',
    'dlitem',
    'empty-heading',
    'heading-order',
    'landmark-one-main',
    'landmark-unique',
    'list',
    'listitem',
    'region',
  ],
}
