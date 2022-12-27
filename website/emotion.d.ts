import '@emotion/react'
import type { theme } from '@scaleway/ui'

type CustomTheme = {
  theme: 'light' | 'dark'
  setTheme: (localTheme: Themes) => void
} & typeof theme

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}
