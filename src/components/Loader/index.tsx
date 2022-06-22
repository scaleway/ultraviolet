import { css, keyframes, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Color } from '../../theme'

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100
const HALF_VIEWBOX_WIDTH = VIEWBOX_WIDTH / 2
const HALF_VIEWBOX_HEIGHT = VIEWBOX_HEIGHT / 2

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

type LoaderProps = {
  active?: boolean
  color?: Color | string
  percentage?: number
  size?: number | string
  strokeWidth?: number
  /**
   * Text is placed in center of ProgressCircle.
   */
  text?: string
  trailColor?: Color | string
  /**
   * Label should be defined for accessibility, to indicate what is loading
   */
  label?: string
}

const Text = styled('text', {
  shouldForwardProp: prop => !['color'].includes(prop),
})<{ color: Color | string }>`
  fill: ${({ theme, color }) =>
    theme.colors[color as Color]?.backgroundStrong || color};

  font-size: 26px;
  dominant-baseline: middle;
  text-anchor: middle;
`

const Loader = ({
  percentage = 20,
  text,
  size = 40,
  strokeWidth = 16,
  color = 'primary',
  trailColor = 'neutral',
  active = false,
  label = 'Loading',
}: LoaderProps) => {
  const theme = useTheme()

  const circleRadius = HALF_VIEWBOX_HEIGHT - strokeWidth / 2
  const boundedPercentage = Math.min(Math.max(percentage, 0), 100) / 100
  const circleDiameter = Math.PI * 2 * circleRadius

  return (
    <svg
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      aria-valuetext={`${percentage}%`}
      css={
        active &&
        css`
          animation: ${spin} 0.75s linear infinite;
        `
      }
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      style={{
        height: typeof size === 'string' ? size : `${size}px`,
        width: typeof size === 'string' ? size : `${size}px`,
      }}
    >
      <circle
        cx={HALF_VIEWBOX_WIDTH}
        cy={HALF_VIEWBOX_HEIGHT}
        r={circleRadius}
        fill="none"
        strokeWidth={strokeWidth}
        stroke={theme.colors[trailColor as Color]?.borderWeak || trailColor}
      />
      <circle
        css={css`
          transition: stroke-dashoffset 0.5s ease 0s;
        `}
        cx={HALF_VIEWBOX_WIDTH}
        cy={HALF_VIEWBOX_HEIGHT}
        r={circleRadius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={circleDiameter}
        strokeDashoffset={(1 - boundedPercentage) * circleDiameter}
        stroke={theme.colors[color as Color]?.backgroundStrong || color}
        strokeLinecap="round"
      />
      {text ? (
        <Text color={color} x={HALF_VIEWBOX_WIDTH} y={HALF_VIEWBOX_HEIGHT}>
          {text}
        </Text>
      ) : null}
    </svg>
  )
}

Loader.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.string,
  /**
   * Label should be defined for accessibility, to indicate what is loading
   */
  label: PropTypes.string,
  percentage: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeWidth: PropTypes.number,
  /**
   * Text is placed in center of ProgressCircle.
   */
  text: PropTypes.string,
  trailColor: PropTypes.string,
}

export default Loader
