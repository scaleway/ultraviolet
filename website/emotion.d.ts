import { SCWUITheme } from '../src'

type CustomTheme = SCWUITheme & {
  theme: 'light' | 'dark'
  setTheme: (localTheme: Themes) => void
}

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
