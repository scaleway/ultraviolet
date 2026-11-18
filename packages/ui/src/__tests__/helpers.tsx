import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@ultraviolet/themes/v2'
import type { ThemeOption } from '@ultraviolet/themes/v2'
import { makeShouldMatchSnapshot } from '@utils/test'
import type { ReactNode } from 'react'

const ComponentWrapper = ({ children, theme = 'light' }: { children?: ReactNode; theme?: ThemeOption }) => (
  <ThemeProvider initialTheme={theme}>
    <div data-testid="testing">{children}</div>
  </ThemeProvider>
)

/**
 * @deprecated
 * use `asFragment()` from the `render` directly
 *
 * @example
 * ```tsx
 *  const { asFragment } = render(...)
 *
 *  expect(asFragment()).toMatchSnapshot()
 * ```
 *
 */
export const shouldMatchSnapshot = (component: ReactNode, theme?: ThemeOption) =>
  makeShouldMatchSnapshot(component, {
    wrapper: ({ children }) => <ComponentWrapper theme={theme}>{children}</ComponentWrapper>,
  })

export const renderWithTheme = (component: ReactNode, theme?: ThemeOption, options?: RenderOptions) => {
  const result = render(component, {
    ...options,
    wrapper: ({ children }) => <ComponentWrapper theme={theme}>{children}</ComponentWrapper>,
  })

  return result
}
