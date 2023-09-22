import type { consoleLightTheme } from '@ultraviolet/themes'

type SCWUITheme = typeof consoleLightTheme
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Theme extends SCWUITheme {}
}
