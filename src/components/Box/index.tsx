import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { x } from '@xstyled/emotion'
import PropTypes from 'prop-types'
import React, {
  ElementType,
  FunctionComponent,
  ReactNode,
  forwardRef,
} from 'react'

const borderedStyles = ({ theme }: { theme: Theme }) => css`
  padding: ${theme.space['3']};
  border-radius: ${theme.radii.default};
  border: 1px solid ${theme.colors.gray350};
`

const StyledBox = styled(x.div, {
  shouldForwardProp: prop => !['bordered'].includes(prop.toString()),
})<{ bordered?: boolean }>`
  ${({ bordered }) => (bordered ? borderedStyles : null)}
`

type BoxProps = {
  bordered?: boolean
  width?: number | string
  height?: number | string
  children?: ReactNode
} & XStyledProps &
  React.HTMLAttributes<HTMLElement>

const forwardType = forwardRef<Element, BoxProps>(() => null)

type BoxType = typeof forwardType & {
  withComponent: (
    element: string | ElementType<unknown>,
  ) => FunctionComponent<BoxProps>
}

// @ts-expect-error We add withComponent just below
const Box: BoxType = forwardRef<Element, BoxProps>(
  ({ width, height, bordered = false, ...props }, ref) => (
    // @ts-expect-error As we won't know the Element kind we can't assume that Ref will be a Element
    <StyledBox ref={ref} w={width} h={height} bordered={bordered} {...props} />
  ),
)

Box.withComponent =
  (element: string | ElementType<unknown>): FunctionComponent<BoxProps> =>
  props =>
    <Box as={element} {...props} />

Box.propTypes = {
  bordered: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Box
