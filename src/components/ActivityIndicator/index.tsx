import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Color } from '../../theme'

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

type ActivityIndicatorProps = {
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

const SVG = styled.svg<{ size: number | string; active: boolean }>`
  width: 100%;
  vertical-align: center;

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

const BasePath = styled('path', {
  shouldForwardProp: prop =>
    !['pathRadius', 'dashRatio', 'color'].includes(prop.toString()),
})<{ pathRadius: number; dashRatio: number }>`
  fill-opacity: 0;
  stroke-linecap: round;

  ${({ pathRadius, dashRatio }) => {
    const diameter = Math.PI * 2 * pathRadius
    const gapLength = (1 - dashRatio) * diameter

    return css`
      stroke-dasharray: ${diameter}px ${diameter}px;
      stroke-dashoffset: ${gapLength}px;
    `
  }}
`

const Trail = styled(BasePath)<{ color: Color | string }>`
  stroke: ${({ theme, color }) =>
    theme.colors[color as Color]?.background || color};
`

const Path = styled(BasePath)<{ color: Color | string }>`
  transition: stroke-dashoffset 0.5s ease 0s;

  stroke: ${({ theme, color }) =>
    theme.colors[color as Color]?.backgroundStrong || color};
`

const Text = styled('text', {
  shouldForwardProp: prop => !['color'].includes(prop.toString()),
})<{ color: Color | string }>`
  fill: ${({ theme, color }) =>
    theme.colors[color as Color]?.backgroundStrong || color};

  font-size: 26px;
  dominant-baseline: middle;
  text-anchor: middle;
`

const getPathRadius = (strokeWidth: number) =>
  VIEWBOX_HEIGHT / 2 - strokeWidth / 2
const getPathRatio = (value: number) => Math.min(Math.max(value, 0), 100) / 100

const getPath = (radius: number) =>
  `M ${VIEWBOX_WIDTH / 2},${
    VIEWBOX_HEIGHT / 2
  } m 0,-${radius} a ${radius},${radius} 0 1 1 0,${
    2 * radius
  } a ${radius},${radius} 0 1 1 0,-${2 * radius}`

const ActivityIndicator = ({
  percentage = 20,
  text,
  size = 40,
  strokeWidth = 16,
  color = 'primary',
  trailColor = 'neutral',
  active = false,
  label = 'Loading',
}: ActivityIndicatorProps) => {
  const pathRadius = getPathRadius(strokeWidth)
  const pathRatio = getPathRatio(percentage)

  const path = getPath(pathRadius)

  return (
    <SVG
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      aria-valuetext={`${percentage}%`}
      size={size}
      active={active}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
    >
      <Trail
        pathRadius={pathRadius}
        dashRatio={1}
        color={trailColor}
        strokeWidth={strokeWidth}
        d={path}
      />
      <Path
        pathRadius={pathRadius}
        dashRatio={pathRatio}
        color={color}
        strokeWidth={strokeWidth}
        d={path}
      />
      {text ? (
        <Text color={color} x={VIEWBOX_WIDTH / 2} y={VIEWBOX_HEIGHT / 2}>
          {text}
        </Text>
      ) : null}
    </SVG>
  )
}

ActivityIndicator.propTypes = {
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

export default ActivityIndicator
