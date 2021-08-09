import { css } from '@emotion/react'
import styled, { StyledComponent } from '@emotion/styled'
import { x } from '@xstyled/emotion'
import PropTypes from 'prop-types'
import React, {
  ElementType,
  HTMLAttributes,
  RefAttributes,
  forwardRef,
} from 'react'

type BoxProps = {
  bordered?: boolean
  width?: number | string
  height?: number | string
}

const StyledBox = styled(x.div, {
  shouldForwardProp: prop => prop !== 'bordered',
})<BoxProps>`
  ${({ bordered, theme }) =>
    bordered
      ? css`
          padding: ${theme.space['3']};
          border-radius: ${theme.radii.default};
          border: 1px solid ${theme.colors.gray350};
        `
      : null}
`

type AllBoxProps = BoxProps &
  XStyledProps &
  HTMLAttributes<Element> &
  RefAttributes<Element>

const Box = forwardRef(
  // map props `width` to w & `height` to h, see https://xstyled.dev/docs/upgrade-guide/#width-becomes-w-height-becomes-h
  ({ width, height, ...props }: BoxProps, ref) => (
    // @ts-expect-error As we won't know the Element kind we can't assume what Ref will be
    <StyledBox ref={ref} w={width} h={height} {...props} />
  ),
) as unknown as StyledComponent<AllBoxProps>

Box.withComponent = (element: string | ElementType<unknown>) =>
  ((props: AllBoxProps) => (
    <Box as={element} {...props} />
  )) as unknown as StyledComponent<AllBoxProps>

Box.propTypes = {
  bordered: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Box
