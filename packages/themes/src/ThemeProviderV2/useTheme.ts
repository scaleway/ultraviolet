import { useContext } from 'react'
import { ThemeContext } from './helpers'

export const useThemeV2 = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeV2 must be used within a ThemeProviderV2')
  }

  return context
}
