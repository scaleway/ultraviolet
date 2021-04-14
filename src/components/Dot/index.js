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

function FwdDot({ color, innerRef, ...props }) {
  return <StyledDot color={color} ref={innerRef} {...props} />
}

FwdDot.propTypes = {
  color: PropTypes.string,
  innerRef: PropTypes.func,
}
FwdDot.defaultProps = {
  color: 'primary',
  innerRef: undefined,
}

function forwardRef(props, ref) {
  return <FwdDot {...props} innerRef={ref} />
}

const Dot = React.forwardRef(forwardRef)
Dot.displayName = 'fwd(Dot)'

export default Dot
