import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { consoleLightTheme, ThemeProvider } from '@ultraviolet/themes'
import type { ReactNode } from 'react'
import { makeShouldMatchSnapshot } from './shouldMatchSnapshot'

export const ComponentWrapper = ({
  children,
  theme = consoleLightTheme,
}: {
  children?: ReactNode
  theme?: typeof consoleLightTheme
}) => (
  <ThemeProvider theme={theme}>
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
export const shouldMatchSnapshot = (component: ReactNode, theme?: typeof consoleLightTheme) =>
  makeShouldMatchSnapshot(component, {
    wrapper: ({ children }) => <ComponentWrapper theme={theme}>{children}</ComponentWrapper>,
  })

export const renderWithTheme = (compoment: ReactNode, theme?: typeof consoleLightTheme, options?: RenderOptions) => {
  const result = render(compoment, {
    ...options,
    wrapper: ({ children }) => <ComponentWrapper theme={theme}>{children}</ComponentWrapper>,
  })

  return result
}
