import '@emotion/react'
import { consoleLightTheme } from '@ultraviolet/themes'

type CustomTheme = {
  theme: 'light' | 'dark'
  setTheme: (localTheme: Themes) => void
} & typeof consoleLightTheme

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}
