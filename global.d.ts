/// <reference types="@emotion/react/types/css-prop" />

declare module '*.svg?react' {
  import type * as React from 'react'

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >

  export default ReactComponent
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.css' {
  const content: string
  export default content
}

declare module '*.woff2' {
  const woff2Content: string
  export default woff2Content
}

declare module '*.webp' {
  const content: string
  export default content
}

declare module '*.md' {
  const content: string
  export default content
}
