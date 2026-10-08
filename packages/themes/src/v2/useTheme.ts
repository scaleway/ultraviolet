import { useContext } from 'react'
import { ThemeContext } from './helpers'

export const useTheme = () => {
  const context = useContext(ThemeContext)

  return context
}
