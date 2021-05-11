import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'

const StyledBox = styled(Box)`
  font-family: 'Lucida Console', 'Monaco', 'Courier New', 'Courier', monospace;
  font-size: 13px;
  font-weight: 500;
  border-radius: 5px;
  color: ${({ color, theme: { colors } }) => colors[color] ?? color};
  background-color: ${({ backgroundColor, theme: { colors } }) =>
    colors[backgroundColor] ?? backgroundColor};
`

const Command = ({ children, ...props }) => (
  <StyledBox as="span" p={1} {...props}>
    {children}
  </StyledBox>
)

Command.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
}

Command.defaultProps = {
  backgroundColor: 'gray100',
  color: 'gray700',
}

export default Command
