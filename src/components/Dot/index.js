import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { cx, thColor } from 'utils'
import { Box } from 'components/Box'

const style = ({ color }) => p => css`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${thColor(color)(p)};
`

function FwdDot({ color = 'primary', innerRef, ...props }) {
  return <Box css={cx(style({ color }))} ref={innerRef} {...props} />
}

FwdDot.propTypes = {
  color: PropTypes.string,
}

function forwardRef(props, ref) {
  return <FwdDot {...props} innerRef={ref} />
}

export const Dot = React.forwardRef(forwardRef)
Dot.displayName = 'fwd(Dot)'
