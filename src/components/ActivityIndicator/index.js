import React from 'react'
import PropTypes from 'prop-types'
import { keyframes, css } from '@emotion/core'
import { Box } from '../Box'

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const spinnerStyle = css`
  display: flex;
  /* animation: ${spinAnimation} 0.75s linear infinite; */
`

const Spinner = ({ children, style }) => (
  <div css={spinnerStyle} style={style}>
    {children}
  </div>
)

const Circle = ({ style }) => (
  <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={style} />
)

export function ActivityIndicator({ size = 20, color = 'primary', ...props }) {
  return (
    <Box
      role="progressbar"
      aria-valuemax={1}
      aria-valuemin={0}
      color={color}
      {...props}
    >
      <Spinner style={{ height: size, width: size }}>
        <svg viewBox="0 0 32 32" height="100%" width="100%">
          <Circle style={{ stroke: 'currentColor', opacity: 0.2 }} />
          <Circle
            style={{
              stroke: 'currentColor',
              strokeDashoffset: 60,
              strokeDasharray: 80,
            }}
          />
        </svg>
      </Spinner>
    </Box>
  )
}

ActivityIndicator.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
