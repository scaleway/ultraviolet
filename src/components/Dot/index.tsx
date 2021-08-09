import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import { Color } from '../../theme/colors'
import Box from '../Box'

const StyledDot = styled(Box, {
  shouldForwardProp: (prop: string) => !['color'].includes(prop),
})`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${({ theme: { colors }, color }) =>
    colors[color as Color] ?? color};
`

type Props = {
  color?: string
  onClick?: () => unknown
} & XStyledProps

const Dot: FunctionComponent<Props> = ({ color = 'primary', ...props }) => (
  <StyledDot color={color} {...props} />
)

Dot.propTypes = {
  /**
   * The dot color
   */
  color: PropTypes.string,
}

export default Dot
