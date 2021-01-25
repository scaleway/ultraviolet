import { ThemeContext } from '@emotion/core'
import { useContext } from 'react'

export function useTheme() {
  return useContext(ThemeContext)
}
