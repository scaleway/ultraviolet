import { ThemeProvider } from '@emotion/react'
import { consoleLightTheme } from '@ultraviolet/themes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

// eslint-disable-next-line no-non-null-assertion
const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <ThemeProvider theme={consoleLightTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
