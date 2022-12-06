import '@emotion/react'
import { theme } from '@scaleway/ui'

type CustomTheme = {
  theme: 'light' | 'dark'
  setTheme: (localTheme: Themes) => void
} & typeof theme

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
