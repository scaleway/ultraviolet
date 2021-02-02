import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../new_theme'
import { Box } from '../Box'

const style = ({ color }) => css`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${colors[color] ?? color};
`

function FwdDot({ color = 'primary', innerRef, ...props }) {
  return <Box css={style({ color })} ref={innerRef} {...props} />
}

FwdDot.propTypes = {
  color: PropTypes.string,
}

function forwardRef(props, ref) {
  return <FwdDot {...props} innerRef={ref} />
}

export const Dot = React.forwardRef(forwardRef)
Dot.displayName = 'fwd(Dot)'
