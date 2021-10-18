import { css, keyframes, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { CircularProgressbarProps } from 'react-circular-progressbar/dist/types'
import { Color } from '../../theme/colors'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const StyledProgressbar = styled(CircularProgressbar)<
  Partial<CircularProgressbarProps> & { size: number | string; active: boolean }
>`
  ${({ size }) => css`
    height: ${typeof size === 'string' ? size : `${size}px`};
    width: ${typeof size === 'string' ? size : `${size}px`};
  `}

  ${({ active }) =>
    active &&
    css`
      animation: ${spin} 0.75s linear infinite;
    `}
`

export type ActivityIndicatorProps = {
  active?: boolean
  color?: string
  percentage?: number
  size?: number | string
  strokeWidth?: number
  /**
   * Text is placed in center of ProgressCircle.
   */
  text?: string
  trailColor?: string
}

const ActivityIndicator: FunctionComponent<ActivityIndicatorProps> = ({
  percentage = 20,
  text,
  size = 40,
  strokeWidth = 16,
  color = 'primary',
  trailColor = 'gray350',
  active = false,
}) => {
  const theme = useTheme()

  return (
    <StyledProgressbar
      value={percentage}
      text={text}
      strokeWidth={strokeWidth}
      active={active}
      size={size}
      styles={{
        path: {
          stroke: theme.colors[color as Color] || color,
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
          stroke: theme.colors[trailColor as Color] || trailColor,
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
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeWidth: PropTypes.number,
  /**
   * Text is placed in center of ProgressCircle.
   */
  text: PropTypes.string,
  trailColor: PropTypes.string,
}

export default ActivityIndicator
