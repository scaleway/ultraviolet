import { Interpolation, Theme } from '@emotion/react'
import { x } from '@xstyled/emotion'
import PropTypes from 'prop-types'
import React, {
  AllHTMLAttributes,
  ElementType,
  FunctionComponent,
  ReactNode,
  forwardRef,
} from 'react'

export interface XStyledProps {
  align?: string
  alignItems?: string
  alignSelf?: string
  as?: string | React.ElementType<unknown>
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
    css?: Interpolation<Theme>
  }

const forwardType = forwardRef<Element, BoxProps>(() => null)

type BoxType = typeof forwardType & {
  withComponent: (
    element: string | ElementType<unknown>,
  ) => FunctionComponent<BoxProps>
  propTypes: FunctionComponent<BoxProps>['propTypes']
}

// @ts-expect-error We add withComponent & propTypes just below
const Box: BoxType = forwardRef<
  Element | HTMLInputElement | HTMLButtonElement,
  BoxProps
>(({ width, height, ...props }, ref) => (
  // @ts-expect-error As we won't know the Element kind we can't assume that Ref will be a Element
  <x.div ref={ref} w={width} h={height} {...props} />
))

Box.withComponent =
  (element: string | ElementType<unknown>): FunctionComponent<BoxProps> =>
  props =>
    <Box as={element} {...props} />

Box.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Box
