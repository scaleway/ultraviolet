type TestElement = HTMLElement | SVGElement

/**
 * Check if an element is visually hidden (using our `VisuallyHidden` component).
 *
 * Can't use `.toBeVisible` since it checks if it:
 * - Is present in the DOM;
 * - Doesn’t have the display CSS property set to none;
 * - Doesn’t have the opacity CSS property set to 0;
 * - Doesn’t have the visibility CSS property set to hidden/collapse;
 * - Doesn’t have the aria-hidden attribute set to true;
 *
 * None of this is true for visually hidden elements. So we check if the style is correctly applied instead.
 */
export const toBeVisuallyHidden = (received: TestElement) => {
  const style = window.getComputedStyle(received)

  const pass =
    style.position === 'absolute' &&
    style.width === '1px' &&
    style.height === '1px' &&
    style.overflow === 'hidden' &&
    style.whiteSpace === 'nowrap' &&
    style.borderTopWidth === '0px' &&
    style.paddingTop === '0px'

  return {
    pass,
    message: () => `expected element to${pass ? ' not' : ''} be visually hidden.`,
  }
}
