import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'

const StyledDot = styled(Box, {
  shouldForwardProp: prop => !['color'].includes(prop),
})`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${({ theme: { colors }, color }) => colors[color] ?? color};
`

const Dot = props => <StyledDot {...props} />

Dot.propTypes = {
  /**
   * The dot color
   */
  color: PropTypes.string,
}

Dot.defaultProps = {
  color: 'primary',
}

export default Dot
