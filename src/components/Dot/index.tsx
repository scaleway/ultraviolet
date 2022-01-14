import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { FunctionComponent } from 'react'
import { Color } from '../../theme'
import { ColorDeprecated } from '../../theme/deprecated/colors'
import Box, { XStyledProps } from '../Box'

const StyledDot = styled(Box, {
  shouldForwardProp: prop => !['color'].includes(prop.toString()),
})`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${({ theme, color }) =>
    theme.colors[color as Color]?.backgroundStrong ??
    theme.colorsDeprecated[color as ColorDeprecated] ??
    color};
`

type DotProps = {
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
