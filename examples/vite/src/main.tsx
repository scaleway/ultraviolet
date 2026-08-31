import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import '@ultraviolet/fonts/fonts-bundled.css'
import '@ultraviolet/ui/styles'
import '@ultraviolet/themes/global'
import '@ultraviolet/themes/light.css'
import '@ultraviolet/themes/dark.css'
import '@ultraviolet/themes/darker.css'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
