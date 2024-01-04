// We need to declare the svg module so that we can import it and style it with emotion
declare module '*.svg' {
  import type styled from '@emotion/styled'

  const svg: Parameters<typeof styled>[0]
  export default svg
}
