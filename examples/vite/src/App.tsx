import { ThemeProvider } from '@ultraviolet/themes/v2'
import '@ultraviolet/ui/styles' // Import styles for the UI components
import '@ultraviolet/icons/styles' // Import styles for the icons components
import '@ultraviolet/themes/global'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Playground } from './Playground'
import { TutorialsPage } from './TutorialsPage'
import './style.css'
import '@ultraviolet/themes/themes.css'

export const App = () => (
  <ThemeProvider initialTheme="system" storageKey="vite-theme-preference">
    <BrowserRouter>
      <Routes>
        <Route element={<Playground />} path="/" />
        <Route element={<TutorialsPage />} path="/tutorials/:page" />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)
