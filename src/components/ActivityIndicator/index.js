import { css, keyframes, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const StyledProgressbar = styled(CircularProgressbar)`
  ${({ size }) => css`
    height: ${size}px;
    width: ${size}px;
  `}

  ${({ active }) =>
    active &&
    css`
      animation: ${spin} 0.75s linear infinite;
    `}
`

const ActivityIndicator = ({
  percentage,
  text,
  size,
  strokeWidth,
  color,
  trailColor,
  active,
}) => {
  const theme = useTheme()

  const percent = active && !percentage ? 20 : percentage

  return (
    <StyledProgressbar
      value={percent}
      text={text}
      strokeWidth={strokeWidth}
      active={active}
      size={size}
      styles={{
        path: {
          stroke: theme.colors[color] || color,
          strokeLinecap: 'round',
        },
        root: {},
        text: {
          dominantBaseline: 'middle',
          fill: theme.colors.primary,
          fontSize: '26px',
          textAnchor: 'middle',
        },
        trail: {
          stroke: theme.colors[trailColor] || trailColor,
          strokeLinecap: 'round',
        },
      }}
    />
  )
}

ActivityIndicator.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.string,
  percentage: PropTypes.number,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  /**
   * Text is placed in center of ProgressCircle.
   */
  text: PropTypes.string,
  trailColor: PropTypes.string,
}

ActivityIndicator.defaultProps = {
  active: false,
  color: 'primary',
  percentage: 0,
  size: 40,
  strokeWidth: 16,
  text: undefined,
  trailColor: 'gray350',
}

export default ActivityIndicator
