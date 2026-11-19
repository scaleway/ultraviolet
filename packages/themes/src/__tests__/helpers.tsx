import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../v2/ThemeProvider'
import type { ThemeOption } from '../v2/types'

const ComponentWrapper = ({ children, theme = 'light' }: { children?: ReactNode; theme?: ThemeOption }) => (
  <ThemeProvider initialTheme={theme}>
    <div data-testid="testing">{children}</div>
  </ThemeProvider>
)

export const renderWithTheme = (component: ReactNode, theme?: ThemeOption, options?: RenderOptions) => {
  const result = render(component, {
    ...options,
    wrapper: ({ children }) => <ComponentWrapper theme={theme}>{children}</ComponentWrapper>,
  })

  return result
}
