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

type Props = {
  bordered?: boolean
  width?: number | string
  height?: number | string
  children?: ReactNode
} & XStyledProps

const forwardType = forwardRef<Element, Props>(() => null)

type BoxType = typeof forwardType & {
  withComponent?: (
    element: string | ElementType<unknown>,
  ) => FunctionComponent<Record<string, unknown>>
}

const Box: BoxType = forwardRef<Element, Props>(
  ({ width, height, bordered = false, ...props }, ref) => (
    // @ts-expect-error yolo
    <StyledBox ref={ref} w={width} h={height} bordered={bordered} {...props} />
  ),
)

Box.withComponent =
  (element: string | ElementType<unknown>): FunctionComponent =>
  (props: Record<string, unknown>) =>
    <Box as={element} {...props} />

Box.propTypes = {
  bordered: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Box
