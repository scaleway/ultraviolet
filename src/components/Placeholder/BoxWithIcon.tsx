import { Theme, css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { VoidFunctionComponent } from 'react'
import Box from '../Box'
import Line from './Line'

const iconStyle = (size: number) => (theme: Theme) =>
  css`
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size}px;
    background-color: ${theme.colors.neutral.background};
  `

const boxStyled = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.neutral.borderWeak};
`

const BoxWithIcon: VoidFunctionComponent<{
  length?: number
  height?: number
  width?: number
}> = ({ length = 1, width = 25, height = 25, ...props }) => (
  <>
    {Array.from({ length }, (_, i) => (
      <Box
        css={boxStyled}
        mx={1}
        key={i}
        height={height}
        width={width}
        {...props}
      >
        <div css={iconStyle(height / 3)} />
        <Line mt={3} width={width / 2} />
      </Box>
    ))}
  </>
)

BoxWithIcon.propTypes = {
  height: PropTypes.number,
  length: PropTypes.number,
  width: PropTypes.number,
}

export default BoxWithIcon
