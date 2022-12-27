import type { SCWUITheme } from '@scaleway/ui'

declare module '@emotion/react' {
  // https://emotion.sh/docs/typescript#define-a-theme
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/consistent-type-definitions
  export interface Theme extends SCWUITheme {}
}
