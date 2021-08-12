/// <reference types="@emotion/react/types/css-prop" />

export {}

declare global {
  type XStyledProps = {
    backgroundColor?: string
    as?: string | React.ElementType<unknown>
    align?: string
    color?: string
    fontWeight?: number
    lineHeight?: string | number
    ml?: string | number
    mr?: string | number
    mt?: string | number
    mb?: string | number
    mx?: string | number
    my?: string | number
    p?: string | number
    pl?: string | number
    pr?: string | number
    pt?: string | number
    pb?: string | number
    px?: string | number
    py?: string | number
    verticalAlign?: string
    width?: string | number
    position?: string

    // HTMLAnchorElement.rel
    rel?: string
    // HTMLAnchorElement.target
    target?: string
  }
}
