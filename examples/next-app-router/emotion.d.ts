import '@emotion/react'
import type { consoleLightTheme } from '@ultraviolet/themes'

type CustomTheme = typeof consoleLightTheme

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}
