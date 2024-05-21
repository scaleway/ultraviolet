import '@emotion/react'
import type { UltravioletUITheme } from '@ultraviolet/ui/src/index'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Theme extends UltravioletUITheme {}
}
