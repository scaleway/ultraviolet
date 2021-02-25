import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'

const sizes = [80, 120, 160, 200]

const randomSize = () => sizes[Math.floor(Math.random() * sizes.length)]

const style = width => theme => css`
  height: 12px;
  width: ${width}px;
  margin-left: 8px;
  border-radius: 10px;
  background-color: ${theme.colors.gray300};
`

const Line = props => (
  <Box css={style(props?.width ?? randomSize())} {...props} />
)

Line.propTypes = {
  width: PropTypes.number,
}

Line.defaultProps = {
  width: undefined,
}

export default Line
