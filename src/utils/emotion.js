import { ThemeContext } from '@emotion/react'
import { useContext } from 'react'

export function useTheme() {
  return useContext(ThemeContext)
}
