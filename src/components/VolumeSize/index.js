import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
import Icon from '../Icon'
import Typography from '../Typography'

const sizes = {
  large: 1.3,
  medium: 1,
  small: 0.7,
  xlarge: 1.5,
  xsmall: 0.5,
}

const widthGrow = keyframes`
  0% {
    width: 0%;
  }
  50% {
    width: 0%;
  }

  100% {
    width: -100%;
  }
`

const StyledTitle = styled.span`
  margin-right: 5px;
`

const StyledValue = styled('span', {
  shouldForwardProp: prop => !['hasError'].includes(prop),
})`
  font-weight: 800;
  color: ${({ hasError, theme }) =>
    hasError ? theme.colors.orange : theme.colors.gray950};
`

const StyledContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})`
  display: flex;
  align-items: center;
  position: relative;

  height: ${({ size }) => (sizes[size] || 1) * 15}px;
  width: 100%;
`

const StyledVolumeContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})`
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 3px;
  position: relative;

  height: ${({ size }) => (sizes[size] || 1) * 6}px;
  width: 100%;
`

const StyledVolume = styled('span', {
  shouldForwardProp: prop => !['percentUsed', 'hasError'].includes(prop),
})`
  background-color: ${({ hasError, theme }) =>
    hasError ? theme.colors.orange : theme.colors.green};
  border-radius: ${({ percentUsed }) =>
    percentUsed >= 100 ? '3px' : '3px 0 0 3px'};
  position: absolute;
  left: 0;
  height: 100%;
  width: ${({ percentUsed }) => percentUsed}%;
  min-width: 0;
  max-width: 100%;
  transition: width 1000ms ease;
  animation-iteration-count: 1;
  animation: ${widthGrow} 1.2s ease backwards;
`

const StyledCursor = styled('div', {
  shouldForwardProp: prop =>
    !['size', 'hasMaxSize', 'isMaxSize'].includes(prop),
})`
  background-color: ${({ theme }) => theme.colors.gray950};
  position: absolute;
  height: ${({ size }) => (sizes[size] || 1) * 15}px;
  width: ${({ size }) => (sizes[size] || 1) * 3}px;
  ${({ isMaxSize, hasMaxSize }) =>
    isMaxSize
      ? `right: 10%;`
      : `
  left: ${hasMaxSize ? '10%' : '50%'};
  transform: translateX(${hasMaxSize ? '0' : '-50%'});
  `}
`

const StyledLabelContainer = styled('div', {
  shouldForwardProp: prop => !['size', 'type'].includes(prop),
})`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  font-weight: 500;
  line-height: ${({ size }) => (sizes[size] || 1) * 8}px;

  position: absolute;
  top: 32px;
  ${({ type }) => (type === 'min' ? `left: 0;` : `right: 0;`)}
`

const StyledLabel = styled('div', {
  shouldForwardProp: prop => !['type'].includes(prop),
})`
  text-align: ${({ type }) => (type === 'min' ? 'left' : 'right')};
`

const getPercentUsed = ({ minSize, maxSize, value, isTooBig, isTooSmall }) => {
  const validMinSize = minSize === 0 ? 1 : minSize
  if (!maxSize) {
    return parseInt((value / validMinSize) * 50, 10)
  }

  if (isTooSmall) {
    return parseInt((value / validMinSize) * 10, 10)
  }

  if (isTooBig) {
    return parseInt(90 + ((value - maxSize) / validMinSize) * 10, 10)
  }

  if (value === minSize) {
    return 10
  }

  if (value === maxSize) {
    return 90
  }

  return parseInt(
    10 + ((value - validMinSize) / (maxSize - validMinSize)) * 80,
    10,
  )
}

const VolumeSize = ({
  maxLabel,
  maxSize,
  minLabel,
  minSize,
  requiredLabel,
  size,
  title,
  tooBigMessage,
  tooSmallMessage,
  unit,
  value,
}) => {
  const isTooBig = maxSize ? value > maxSize : false
  const isTooSmall = minSize ? value < minSize : false
  const hasError = isTooBig || isTooSmall

  return (
    <Box mb={5}>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="bodyA" mr={2} fontWeight={500}>
          <StyledTitle>{title}</StyledTitle>
          <StyledValue hasError={hasError}>
            {value} {unit}
          </StyledValue>
        </Typography>
        <Icon
          color={hasError ? 'orange' : 'green'}
          mr={1}
          name={hasError ? 'alert' : 'checkbox-marked-circle-outline'}
        />
        {hasError && (
          <Typography variant="bodyA" color="orange">
            {isTooBig ? tooBigMessage : tooSmallMessage}
          </Typography>
        )}
      </Box>
      <StyledContainer size={size}>
        <StyledVolumeContainer size={size}>
          <StyledVolume
            percentUsed={getPercentUsed({
              isTooBig,
              isTooSmall,
              maxSize,
              minSize,
              value,
            })}
            hasError={hasError}
          />
        </StyledVolumeContainer>
        <StyledCursor size={size} hasMaxSize={!!maxSize}>
          <StyledLabelContainer size={size} type="min">
            <StyledLabel type="min">
              {minSize} {unit}
            </StyledLabel>
            <Typography variant="bodyC">
              {maxSize ? minLabel : requiredLabel}
            </Typography>
          </StyledLabelContainer>
        </StyledCursor>
        {maxSize && (
          <StyledCursor isMaxSize>
            <StyledLabelContainer size={size} type="max">
              <StyledLabel type="max">
                {maxSize} {unit}
              </StyledLabel>
              <Typography variant="bodyC">{maxLabel}</Typography>
            </StyledLabelContainer>
          </StyledCursor>
        )}
      </StyledContainer>
    </Box>
  )
}

VolumeSize.propTypes = {
  /**
   * maximum label below the maxSize
   */
  maxLabel: PropTypes.string,
  maxSize: PropTypes.number,
  /**
   * minimum label below the minSize
   */
  minLabel: PropTypes.string,
  minSize: PropTypes.number.isRequired,
  /**
   * required label below the required size (only when minSize is set and maxSize are not)
   */
  requiredLabel: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(sizes)),
  /**
   * The title to place above
   */
  title: PropTypes.string,
  /**
   * The message to display when the value is greather than maxSize
   */
  tooBigMessage: PropTypes.string,
  /**
   * The message to display when the value is lower than minSize
   */
  tooSmallMessage: PropTypes.string,
  /**
   * The text to display next to the value, minSize, maxSize
   */
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

VolumeSize.defaultProps = {
  maxLabel: 'maximum',
  maxSize: undefined,
  minLabel: 'minimum',
  requiredLabel: 'required',
  size: 'medium',
  title: undefined,
  tooBigMessage: 'Volume capacity exceeded',
  tooSmallMessage: 'Not enough volume allocated',
}

export default VolumeSize
