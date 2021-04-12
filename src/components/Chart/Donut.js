import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import Box from '../Box'
import patternVariants from './patterns'

const CIRCUM = 566

const fillAndRotateCircleAnim = (lengthSegment, rotationSegment) => keyframes`
  from {
    stroke-dasharray: 3 ${CIRCUM} 10 0;
    transform: rotate(0deg);
  }
  to {
    stroke-dasharray: ${lengthSegment} ${CIRCUM} 10 0;
    transform: rotate(${rotationSegment}deg);
  }
`

const circleFill = ({ lengthSegment, rotationSegment, fillMustBeAnimated }) =>
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

const getValueFromPercent = percent => (percent * CIRCUM) / 100

const getRotationFormPercent = percent => (percent / CIRCUM) * 360

const Circle = styled.circle`
  transform-origin: 50% 50%;
  transition: stroke-width 500ms ease;
  stroke: ${({ patternName, color, theme }) =>
    patternName ? `url(#${patternName})` : theme.colors[color] ?? color};
  stroke-width: ${({ isFocused }) => (isFocused ? 23 : 18)};
  stroke-linecap: butt;
  fill: none;
  cursor: pointer;

  ${circleFill}
`

Circle.defaultProps = {
  isFocused: false,
  lengthSegment: CIRCUM,
  rotationSegment: 0,
  fillMustBeAnimated: false,
  patternName: '',
}

Circle.propTypes = {
  color: PropTypes.string,
  isFocused: PropTypes.bool,
  lengthSegment: PropTypes.number,
  rotationSegment: PropTypes.number,
  fillMustBeAnimated: PropTypes.bool,
  patternName: PropTypes.string,
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

const Donut = ({
  height,
  width,
  content,
  data,
  focused,
  onFocusChange,
  chartId,
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
      <svg style={{ height, width, transform: 'rotate(-90deg)' }}>
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
          const rotateValueFromPercent = getRotationFormPercent(
            sumPreviousValues,
          )
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
  height: PropTypes.number,
  width: PropTypes.number,
  content: PropTypes.node,
  focused: PropTypes.number,
  onFocusChange: PropTypes.func,
  chartId: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      product: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

Donut.defaultProps = {
  height: 206,
  width: 206,
  content: undefined,
  focused: undefined,
  onFocusChange: undefined,
  chartId: undefined,
}

export default Donut
