// We need to declare the svg module so that we can import it and style it with emotion
declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const content: string

  export { ReactComponent }
  export default content
}

declare module '*.md' {
  const content: string
  export default content
}
