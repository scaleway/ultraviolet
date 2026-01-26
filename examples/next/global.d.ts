declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

declare module '@ultraviolet/ui/styles' {
  const content: string
  export default content
}

declare module '@ultraviolet/icons/styles' {
  const content: string
  export default content
}

declare module '@ultraviolet/themes/global' {
  const content: string
  export default content
}

declare module '@ultraviolet/themes/dark.css' {
  const content: string
  export default content
}

declare module '@ultraviolet/themes/darker.css' {
  const content: string
  export default content
}

declare module '@ultraviolet/themes/light.css' {
  const content: string
  export default content
}
