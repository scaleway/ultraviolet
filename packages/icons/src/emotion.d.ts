import type { consoleLightTheme } from '@ultraviolet/themes'

type UltravioletUITheme = typeof consoleLightTheme
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Theme extends UltravioletUITheme {}
}
