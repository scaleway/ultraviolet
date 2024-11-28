import type { UltravioletUITheme } from '.'

declare module '@emotion/react' {
  export interface Theme extends UltravioletUITheme {}
}
