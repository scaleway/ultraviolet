/// <reference types="@emotion/react/types/css-prop" />

export {}

declare global {
  type XStyledProps = {
    backgroundColor?: string
    as?: string | React.ElementType<unknown>
    align?: string
    alignItems?: string
    justifyContent?: string
    color?: string
    display?: string
    fontSize?: number
    fontWeight?: number
    lineHeight?: string | number
    mb?: string | number
    ml?: string | number
    mr?: string | number
    mt?: string | number
    mx?: string | number
    my?: string | number
    overflow?: string
    p?: string | number
    pb?: string | number
    pl?: string | number
    position?: string
    pr?: string | number
    pt?: string | number
    px?: string | number
    py?: string | number
    verticalAlign?: string
    width?: string | number

    // HTMLAnchorElement.rel
    rel?: string
    // HTMLAnchorElement.target
    target?: string
  }
}
