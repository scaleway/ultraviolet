import { Box as XStyledBox } from '@xstyled/emotion'
import type {
  AllHTMLAttributes,
  ComponentProps,
  ElementType,
  ReactNode,
} from 'react'
import { forwardRef } from 'react'

export type XStyledProps = {
  align?: string
  alignItems?: string
  alignSelf?: string
  backgroundColor?: string
  border?: string
  borderRadius?: string | number
  boxShadow?: string
  color?: string
  display?: string
  flex?: string | number
  flexWrap?: string
  flexDirection?: string
  fontSize?: number
  fontStyle?: string
  fontWeight?: number
  height?: string | number
  justifyContent?: string
  lineHeight?: string | number
  minHeight?: string | number
  maxHeight?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  m?: string | number
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
  right?: number
  textAlign?: string
  textOverflow?: string
  textTransform?: string
  top?: number
  verticalAlign?: string
  width?: string | number

  // HTMLAnchorElement.rel
  rel?: string
  // HTMLAnchorElement.target
  target?: string
}

export type BoxProps = {
  children?: ReactNode
  height?: number | string
  width?: number | string
} & Omit<AllHTMLAttributes<HTMLElement>, 'as' | 'size' | 'action'> &
  XStyledProps & {
    as?: ComponentProps<typeof XStyledBox>['as'] | string
  }

const forwardType = forwardRef<Element, BoxProps>(() => null)

type BoxType = typeof forwardType & {
  withComponent: (
    element: string | ElementType<unknown>,
  ) => (props: BoxProps) => JSX.Element
}

/**
 * @deprecated
 */
// @ts-expect-error We add withComponent just below
const Box: BoxType = forwardRef<
  Element | HTMLInputElement | HTMLButtonElement,
  BoxProps
>(({ width, height, ...props }, ref) => (
  // @ts-expect-error As we won't know the Element kind we can't assume that Ref will be a Element
  <XStyledBox ref={ref} w={width} h={height} {...props} />
))

Box.withComponent =
  (element: string | ElementType<unknown>) => (props: BoxProps) =>
    <Box as={element} {...props} />

export default Box
