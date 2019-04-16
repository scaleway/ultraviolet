import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { cx, thColor } from 'utils'
import { Box } from './Box'

const style = ({ color }) => p => {
  return css`
    display: inline-block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: ${thColor(color)(p)};
  `
}

export function Dot({ color = 'primary', ...props }) {
  return <Box css={cx(style({ color }))} {...props} />
}

Dot.propTypes = {
  color: PropTypes.string,
}

export default Dot
