import '@emotion/react'
import type { SCWUITheme } from '@scaleway/ui'

type CustomTheme = {
  theme: string
  setTheme: (localTheme: Themes) => void
} & typeof SCWUITheme

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}
