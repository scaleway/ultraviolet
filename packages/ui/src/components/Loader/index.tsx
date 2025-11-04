'use client'

import { css, useTheme } from '@emotion/react'
import type { CSSProperties } from 'react'
import type { ExtendedColor } from '../../theme'
import { circle, loader } from './styles.css'

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100
const HALF_VIEWBOX_WIDTH = VIEWBOX_WIDTH / 2
const HALF_VIEWBOX_HEIGHT = VIEWBOX_HEIGHT / 2

export const SIZES = {
  large: '300',
  medium: '250',
  small: '200',
  xlarge: '400',
  xsmall: '150',
  xxlarge: '700',
} as const

type LoaderProps = {
  active?: boolean
  sentiment?: ExtendedColor
  percentage?: number
  size?: keyof typeof SIZES
  /**
   * Label should be defined for accessibility, to indicate what is loading
   */
  label?: string
  style?: CSSProperties
}

/**
 * Loader is a circular progress indicator that can be used to indicate that an action is being performed.
 */
export const Loader = ({
  percentage = 20,
  size = 'xlarge',
  sentiment = 'primary',
  active = false,
  label = 'Loading',
  style,
}: LoaderProps) => {
  const theme = useTheme()

  const circleRadius = HALF_VIEWBOX_HEIGHT - 8
  const boundedPercentage = Math.min(Math.max(percentage, 0), 100) / 100
  const circleDiameter = Math.PI * 2 * circleRadius

  return (
    <svg
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={percentage}
      aria-valuetext={`${percentage}%`}
      className={active ? loader : undefined}
      role="progressbar"
      style={{
        height: theme.sizing[SIZES[size]],
        width: theme.sizing[SIZES[size]],
        ...style,
      }}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
    >
      <circle
        className={circle}
        cx={HALF_VIEWBOX_WIDTH}
        cy={HALF_VIEWBOX_HEIGHT}
        fill="none"
        r={circleRadius}
        strokeWidth={16}
      />
      <circle
        // oxlint-disable-next-line no-unknown-property
        css={css`
          transition: stroke-dashoffset 0.5s ease 0s;
        `}
        cx={HALF_VIEWBOX_WIDTH}
        cy={HALF_VIEWBOX_HEIGHT}
        fill="none"
        r={circleRadius}
        stroke={
          sentiment === 'black' || sentiment === 'white'
            ? theme.colors.other.monochrome[sentiment].background
            : theme.colors[sentiment]?.backgroundStrong
        }
        strokeDasharray={circleDiameter}
        strokeDashoffset={(1 - boundedPercentage) * circleDiameter}
        strokeLinecap="round"
        strokeWidth={16}
      />
    </svg>
  )
}
