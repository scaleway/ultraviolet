import '@emotion/react'
import '@emotion/serialize'
import { SCWUITheme } from '../src/theme'

declare module '@emotion/react' {
  // https://emotion.sh/docs/typescript#define-a-theme
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends SCWUITheme {}
}
