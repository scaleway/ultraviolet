import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from '../../theme'
import { Box } from '../Box'

const style = ({ color, bgColor }) => css`
  font-family: 'Lucida Console', 'Monaco', 'Courier New', 'Courier', monospace;
  font-size: 13px;
  font-weight: 500;
  border-radius: 5px;
  color: ${color};
  background-color: ${bgColor};
`

const Command = ({
  children,
  color = theme.lightBlack,
  bgColor = theme.light,
  ...props
}) => (
  <Box css={style({ color, bgColor })} as="span" p={1} {...props}>
    {children}
  </Box>
)

Command.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
}

Command.defaultProps = {
  color: theme.lightBlack,
  bgColor: theme.light,
}

export { Command }
