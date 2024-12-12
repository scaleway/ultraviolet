import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { Color } from '../../theme'

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100
const HALF_VIEWBOX_WIDTH = VIEWBOX_WIDTH / 2
const HALF_VIEWBOX_HEIGHT = VIEWBOX_HEIGHT / 2

const StyledSvg = styled('svg', {
  shouldForwardProp: prop => !['active'].includes(prop),
})<{ active: boolean }>`
  ${({ active }) =>
    active
      ? `
        animation: spin 0.75s linear infinite;

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `
      : ''}
`

type LoaderProps = {
  active?: boolean
  color?: Color | (string & NonNullable<unknown>)
  percentage?: number
  size?: number | string
  strokeWidth?: number
  /**
   * Text is placed in center of ProgressCircle.
   */
  text?: string
  trailColor?: Color | (string & NonNullable<unknown>)
  /**
   * Label should be defined for accessibility, to indicate what is loading
   */
  label?: string
}

const Text = styled('text', {
  shouldForwardProp: prop => !['color'].includes(prop),
})<{ color: Color | (string & NonNullable<unknown>) }>`
  fill: ${({ theme, color }) =>
    theme.colors[color as Color]?.backgroundStrong || color};

  font-size: ${({ theme }) => theme.typography.headingLarge.fontSize};
  dominant-baseline: middle;
  text-anchor: middle;
`

/**
 * Loader is a circular progress indicator that can be used to indicate that an action is being performed.
 */
export const Loader = ({
  percentage = 20,
  text,
  size = '2.5rem',
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
    <StyledSvg
      active={active}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      aria-valuetext={`${percentage}%`}
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
        stroke={theme.colors[trailColor as Color]?.border || trailColor}
      />
      <circle
        // oxlint-disable-next-line no-unknown-property
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
    </StyledSvg>
  )
}
