import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@smooth-ui/core-em'
import { css } from '@emotion/core'
import { cx } from 'utils'
import { colors } from 'theming'

const style = ({ color }) => p => {
  const colorsValue = colors(p)
  return css`
    display: inline-block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: ${colorsValue[color](p)};
  `
}

export function Dot({ color = 'primary', ...props }) {
  return <Box css={cx(style({ color }))} {...props} />
}

Dot.propTypes = {
  color: PropTypes.string,
}

export default Dot
