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
  export interface Theme extends SCWUITheme {}
}
