import { css, keyframes } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'

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
  animation: ${spinAnimation} 0.75s linear infinite;
`

const Spinner = ({ children, style }) => (
  <div css={spinnerStyle} style={style}>
    {children}
  </div>
)

Spinner.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}).isRequired,
}

const Circle = ({ style }) => (
  <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={style} />
)

Circle.propTypes = {
  style: PropTypes.shape({}).isRequired,
}

const ActivityIndicator = ({ size, color, ...props }) => (
  <Box
    role="progressbar"
    aria-valuemax={1}
    aria-valuemin={0}
    color={color}
    {...props}
  >
    <Spinner style={{ height: size, width: size }}>
      <svg viewBox="0 0 32 32" height="100%" width="100%">
        <Circle style={{ opacity: 0.2, stroke: 'currentColor' }} />
        <Circle
          style={{
            stroke: 'currentColor',
            strokeDasharray: 80,
            strokeDashoffset: 60,
          }}
        />
      </svg>
    </Spinner>
  </Box>
)

ActivityIndicator.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

ActivityIndicator.defaultProps = {
  color: 'primary',
  size: 10,
}

export default ActivityIndicator
