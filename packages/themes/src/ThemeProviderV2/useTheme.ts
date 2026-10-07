import { useContext } from 'react'
import { ThemeContext } from './helpers'

export const useThemeV2 = () => {
  const context = useContext(ThemeContext)

  return context
}
