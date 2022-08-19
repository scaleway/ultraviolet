import type { SCWUITheme } from '@scaleway/ui'
import '@emotion/react'

declare global {
  declare module '*.svg' {
    const content: string
    export default content
  }

  interface ApplicationSettings {
    isLightMode: boolean
  }
}

declare module '@emotion/react' {
  // https://emotion.sh/docs/typescript#define-a-theme
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends SCWUITheme {}
}
