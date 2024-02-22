import '@emotion/react'
import type { UltravioletUITheme } from '@ultraviolet/ui'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
  export interface Theme extends UltravioletUITheme {}
}
