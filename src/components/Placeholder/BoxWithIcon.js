import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
import Line from './Line'

const iconStyle = size => theme =>
  css`
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size}px;
    background-color: ${theme.colors.gray300};
  `

const boxStyled = theme => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.gray300};
`

const BoxWithIcon = ({ length, ...props }) =>
  Array.from({ length }, (_, i) => (
    <Box css={boxStyled} mx={1} key={i} {...props}>
      <div css={iconStyle(props.height / 3)} />
      <Line mt={3} width={props.width / 2} />
    </Box>
  ))

BoxWithIcon.defaultProps = {
  height: 25,
  length: 1,
  width: 25,
}

BoxWithIcon.propTypes = {
  height: PropTypes.number,
  length: PropTypes.number,
  width: PropTypes.number,
}

export default BoxWithIcon
