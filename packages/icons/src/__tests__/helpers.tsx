import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { consoleLightTheme, ThemeProvider } from '@ultraviolet/themes'
import type { ReactNode } from 'react'

const ComponentWrapper = ({
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

export const renderWithTheme = (component: ReactNode, theme?: typeof consoleLightTheme, options?: RenderOptions) => {
  const result = render(component, {
    ...options,
    wrapper: ({ children }) => <ComponentWrapper theme={theme}>{children}</ComponentWrapper>,
  })

  return result
}
