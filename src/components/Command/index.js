import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../theme'
import { Box } from '../Box'

const style = css`
  font-family: 'Lucida Console', 'Monaco', 'Courier New', 'Courier', monospace;
  font-size: 13px;
  font-weight: 500;
  border-radius: 5px;
`

const Command = ({ children, color, backgroundColor, ...props }) => (
  <Box
    color={color}
    backgroundColor={backgroundColor}
    css={style}
    as="span"
    p={1}
    {...props}
  >
    {children}
  </Box>
)

Command.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
}

Command.defaultProps = {
  color: colors.lightBlack,
  backgroundColor: colors.light,
}

export { Command }
