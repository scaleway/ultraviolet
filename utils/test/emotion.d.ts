import '@emotion/react'
import type { UltravioletUITheme } from '@ultraviolet/ui/src/index'

declare module '@emotion/react' {
  export interface Theme extends UltravioletUITheme {}
}
