import '@emotion/react'

declare global {
  declare module '*.svg' {
    const content: string
    export default content
  }
}
