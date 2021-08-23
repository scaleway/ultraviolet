import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { VoidFunctionComponent, useRef } from 'react'
import { Color } from '../../theme/colors'
import Box from '../Box'
import patternVariants from './patterns'

const CIRCUM = 566

const fillAndRotateCircleAnim = (lengthSegment: number, rotationSegment: number) => keyframes`
  from {
    stroke-dasharray: 3 ${CIRCUM} 10 0;
    transform: rotate(0deg);
  }
  to {
    stroke-dasharray: ${lengthSegment} ${CIRCUM} 10 0;
    transform: rotate(${rotationSegment}deg);
  }
`

const circleFill = ({ lengthSegment, rotationSegment, fillMustBeAnimated }: { lengthSegment: number, rotationSegment: number, fillMustBeAnimated: boolean }) =>
  fillMustBeAnimated
    ? css`
        ${fillAndRotateCircleAnim(lengthSegment, rotationSegment).styles}
        animation: ${fillAndRotateCircleAnim(lengthSegment, rotationSegment)
          .name} 1s ease forwards;
      `
    : css`
        stroke-dasharray: ${lengthSegment} ${CIRCUM} 10 0;
        transform: rotate(${rotationSegment}deg);
      `

const getValueFromPercent = (percent: number) => (percent * CIRCUM) / 100

const getRotationFormPercent = (percent: number) => (percent / CIRCUM) * 360

const Circle = styled.circle<{ fillMustBeAnimated?: boolean, patternName?: string, color?: string, isFocused?: boolean }>`
  transform-origin: 50% 50%;
  transition: stroke-width 500ms ease;
  stroke: ${({ patternName, color, theme }) =>
    patternName ? `url(#${patternName})` : theme.colors[color as Color] ?? color};
  stroke-width: ${({ isFocused }) => (isFocused ? 23 : 18)};
  stroke-linecap: butt;
  fill: none;
  cursor: pointer;

  ${circleFill}
`

Circle.defaultProps = {
  fillMustBeAnimated: false,
  isFocused: false,
  lengthSegment: CIRCUM,
  patternName: '',
  rotationSegment: 0,
}

Circle.propTypes = {
  color: PropTypes.string,
  fillMustBeAnimated: PropTypes.bool,
  isFocused: PropTypes.bool,
  lengthSegment: PropTypes.number,
  patternName: PropTypes.string,
  rotationSegment: PropTypes.number,
}

const StyledContent = styled.div`
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;

  font-size: 25px;
  line-height: 100px;
  height: 100px;
  width: 100px;
  margin: auto;
  text-align: center;
  vertical-align: middle;
`

type DonutProps = {
  chartId?: string,
  content?: React.ReactNode,
  data: {
    color: string,
    name?: string,
    percent: number,
    product: string,
    value?: string
  }[],
  focused?: number,
  height?: number,
  onFocusChange?(...args: unknown[]): unknown,
  width?: number
};

const Donut: VoidFunctionComponent<DonutProps> = ({
  height = 206,
  width = 206,
  content,
  data,
  focused,
  onFocusChange,
  chartId
}) => {
  const previousSegmentLength = useRef(0)
  const fillMustBeAnimated = !previousSegmentLength.current
  if (!fillMustBeAnimated) {
    previousSegmentLength.current = 0
  }
  const patterns = data.map(item =>
    item.needPattern ? patternVariants[item.product](item.color) : null,
  )

  return (
    <Box position="relative" height={height} width={width}>
      <svg style={{ height, transform: 'rotate(-90deg)', width }}>
        <defs>{patterns}</defs>

        {/* Initial Gray circle */}
        <Circle
          color="gray300"
          style={{ cursor: 'default' }}
          cx={width / 2}
          cy={height / 2}
          r="90"
        />

        {/* Colored Segmented circles */}
        {data.map((item, index) => {
          const isFocused = focused !== undefined && index === focused
          const segmentValueFromPercent = getValueFromPercent(item.percent)
          const sumPreviousValues = previousSegmentLength.current || 0
          const rotateValueFromPercent =
            getRotationFormPercent(sumPreviousValues)
          previousSegmentLength.current =
            sumPreviousValues + segmentValueFromPercent

          const id = `${chartId ? `${chartId}-` : ''}donut-${item.product}`

          return (
            <Circle
              onMouseEnter={() => onFocusChange(index)}
              onMouseLeave={() => onFocusChange()}
              color={item.color}
              data-testid={id}
              key={id}
              isFocused={isFocused}
              lengthSegment={segmentValueFromPercent}
              rotationSegment={rotateValueFromPercent}
              fillMustBeAnimated={fillMustBeAnimated}
              patternName={item.needPattern && item.product}
              cx={width / 2}
              cy={height / 2}
              r="90"
            />
          )
        })}
      </svg>

      {/* Content inside chart */}
      {content && <StyledContent>{content}</StyledContent>}
    </Box>
  )
}

Donut.propTypes = {
  chartId: PropTypes.string,
  content: PropTypes.node,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      name: PropTypes.string,
      percent: PropTypes.number.isRequired,
      product: PropTypes.string.isRequired,
      value: PropTypes.string,
    }),
  ).isRequired,
  focused: PropTypes.number,
  height: PropTypes.number,
  onFocusChange: PropTypes.func,
  width: PropTypes.number,
}

Donut.defaultProps = {
  chartId: undefined,
  content: undefined,
  focused: undefined,
  height: 206,
  onFocusChange: undefined,
  width: 206,
}

export default Donut
