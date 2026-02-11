// oxlint-disable import/no-unassigned-import
import '@ultraviolet/fonts/fonts.css'
import '@ultraviolet/themes/global'
import '@ultraviolet/ui/styles'
import { consoleLightTheme, ThemeProvider } from '@ultraviolet/themes'
import { Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { lazy } from 'react'
import {
  Link as ReactRouterLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

const GlobalWrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ padding: '48px' }}>{children}</div>
)

/**
 * We get all the render.tsx in tests folder and generate individual pages / routes to render the content.
 */
const modules = import.meta.glob('./tests/**/*.tsx')
const pagesToRender = Object.keys(modules)
  .map(path =>
    path.includes('render.tsx')
      ? {
          Component: lazy(
            // oxlint-disable-next-line typescript/no-unsafe-return
            async () => import(`./tests/${path?.split('/')[2]}/render.tsx`),
          ),
          name: path.replace('.tsx', ''),
        }
      : null,
  )
  .filter(Boolean)
/**
 * ----------------------------------------
 */

const WelcomePage = () => (
  <>
    <Text as="p" variant="headingStrong">
      Welcome to the Ultraviolet E2E testing suite!
    </Text>
    <Text as="p" variant="body">
      This page is a placeholder for the available pages to test. Please read
      the README.md file for more information.
    </Text>
    <Text as="p" variant="body">
      Available pages to test:
    </Text>
    <ul>
      {pagesToRender.map(path => (
        <li key={path?.name}>
          <ReactRouterLink
            to={{ pathname: path?.name?.split('/')[2]?.toLowerCase() ?? '' }}
          >
            {path?.name?.split('/')[2]?.toLowerCase()}
          </ReactRouterLink>
        </li>
      ))}
    </ul>
  </>
)

const App = () => (
  <ThemeProvider theme={consoleLightTheme}>
    <GlobalWrapper>
      <Router>
        <Routes>
          <Route element={<WelcomePage />} path="/" />
          {pagesToRender.map(path => {
            const Element = path?.Component

            if (Element) {
              return (
                <Route
                  element={<Element />}
                  key={path?.name}
                  path={path?.name?.split('/')[2]?.toLowerCase()}
                />
              )
            }

            return null
          })}
        </Routes>
      </Router>
    </GlobalWrapper>
  </ThemeProvider>
)

export default App
