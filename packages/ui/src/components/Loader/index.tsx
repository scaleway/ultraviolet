'use client'

import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { ExtendedColor } from '../../theme'

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100
const HALF_VIEWBOX_WIDTH = VIEWBOX_WIDTH / 2
const HALF_VIEWBOX_HEIGHT = VIEWBOX_HEIGHT / 2

export const SIZES = {
  xsmall: '150',
  small: '200',
  medium: '250',
  large: '300',
  xlarge: '400',
  xxlarge: '700',
} as const

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
  sentiment?: ExtendedColor
  percentage?: number
  size?: keyof typeof SIZES
  /**
   * Label should be defined for accessibility, to indicate what is loading
   */
  label?: string
}

export const StyledCircle = styled.circle`
stroke: ${({ theme }) => theme.colors.neutral.border};
`

/**
 * Loader is a circular progress indicator that can be used to indicate that an action is being performed.
 */
export const Loader = ({
  percentage = 20,
  size = 'xlarge',
  sentiment = 'primary',
  active = false,
  label = 'Loading',
}: LoaderProps) => {
  const theme = useTheme()

  const circleRadius = HALF_VIEWBOX_HEIGHT - 8
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
        height: theme.sizing[SIZES[size]],
        width: theme.sizing[SIZES[size]],
      }}
    >
      <StyledCircle
        cx={HALF_VIEWBOX_WIDTH}
        cy={HALF_VIEWBOX_HEIGHT}
        r={circleRadius}
        fill="none"
        strokeWidth={16}
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
        strokeWidth={16}
        strokeDasharray={circleDiameter}
        strokeDashoffset={(1 - boundedPercentage) * circleDiameter}
        stroke={
          sentiment === 'black' || sentiment === 'white'
            ? theme.colors.other.monochrome[sentiment].background
            : theme.colors[sentiment]?.backgroundStrong
        }
        strokeLinecap="round"
      />
    </StyledSvg>
  )
}
