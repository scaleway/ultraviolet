import type { consoleLightTheme } from '@ultraviolet/themes'

type UltravioletUITheme = typeof consoleLightTheme
declare module '@emotion/react' {
  export interface Theme extends UltravioletUITheme {}
}
