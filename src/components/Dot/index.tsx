import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import { Color } from '../../theme/colors'
import Box, { XStyledProps } from '../Box'

const StyledDot = styled(Box, {
  shouldForwardProp: prop => !['color'].includes(prop.toString()),
})`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${({ theme: { colors }, color }) =>
    colors[color as Color] ?? color};
`

export type DotProps = {
  /**
   * The dot color
   */
  color?: string
  onClick?: () => unknown
} & XStyledProps

const Dot: FunctionComponent<DotProps> = ({ color = 'primary', ...props }) => (
  <StyledDot color={color} {...props} />
)

Dot.propTypes = {
  color: PropTypes.string,
}

export default Dot
