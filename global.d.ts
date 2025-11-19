declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react'

  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>
  const content: string

  export { ReactComponent }
  export default content
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
