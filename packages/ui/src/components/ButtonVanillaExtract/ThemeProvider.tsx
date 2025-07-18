import type { ReactNode } from 'react'
import { useReducer } from 'react'
import { darkTheme, lightTheme } from './theme.css'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, toggleTheme] = useReducer(prevState => !prevState, true)

  return (
    <div
      className={theme ? lightTheme : darkTheme}
      style={{ background: theme ? 'white' : 'black' }}
    >
      <button type="button" onClick={toggleTheme}>
        Switch theme
      </button>
      <br />
      <br />
      {children}
    </div>
  )
}
