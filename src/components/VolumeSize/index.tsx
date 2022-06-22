import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import Typography from '../Typography'

const sizes = {
  large: 1.3,
  medium: 1,
  small: 0.7,
  xlarge: 1.5,
  xsmall: 0.5,
}

type Sizes = keyof typeof sizes

type StyleProps = {
  hasError?: boolean
  size?: Sizes
  percentUsed?: number
  isMaxSize?: boolean
  hasMaxSize?: boolean
  type?: 'min' | 'max'
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
  shouldForwardProp: prop => prop !== 'hasError',
})<{ hasError?: boolean }>`
  font-weight: 800;
  color: ${({ hasError, theme }) =>
    hasError ? theme.colors.warning.textWeak : theme.colors.neutral.text};
`

const StyledContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop.toString()),
})<{ size?: Sizes }>`
  display: flex;
  align-items: center;
  position: relative;

  height: ${({ size = 'medium' }) => (sizes[size] || 1) * 15}px;
  width: 100%;
`

const StyledVolumeContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop.toString()),
})<StyleProps>`
  background-color: ${({ theme }) => theme.colors.primary.background};
  border-radius: 3px;
  position: relative;

  height: ${({ size = 'medium' }) => (sizes[size] || 1) * 6}px;
  width: 100%;
`

const StyledVolume = styled('span', {
  shouldForwardProp: prop =>
    !['percentUsed', 'hasError'].includes(prop.toString()),
})<StyleProps>`
  background-color: ${({ hasError, theme }) =>
    hasError
      ? theme.colors.warning.backgroundStrong
      : theme.colors.success.backgroundStrong};
  border-radius: ${({ percentUsed = 0 }) =>
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
    !['size', 'hasMaxSize', 'isMaxSize'].includes(prop.toString()),
})<StyleProps>`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStronger};
  position: absolute;
  height: ${({ size = 'medium' }) => (sizes[size] || 1) * 15}px;
  width: ${({ size = 'medium' }) => (sizes[size] || 1) * 3}px;
  ${({ isMaxSize, hasMaxSize }) =>
    isMaxSize
      ? `right: 10%;`
      : `
  left: ${hasMaxSize ? '10%' : '50%'};
  transform: translateX(${hasMaxSize ? '0' : '-50%'});
  `}
`

const StyledLabelContainer = styled('div', {
  shouldForwardProp: prop => !['size', 'type'].includes(prop.toString()),
})<StyleProps>`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  font-weight: 500;
  line-height: ${({ size = 'medium' }) => (sizes[size] || 1) * 8}px;

  position: absolute;
  top: 32px;
  ${({ type }) => (type === 'min' ? `left: 0;` : `right: 0;`)}
`

const StyledLabel = styled('div', {
  shouldForwardProp: prop => !['type'].includes(prop.toString()),
})<StyleProps>`
  text-align: ${({ type }) => (type === 'min' ? 'left' : 'right')};
`

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space['1']};
`

const StyledComponentContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.space['5']};
`

const getPercentUsed = ({
  minSize,
  maxSize,
  value,
  isTooBig,
  isTooSmall,
}: {
  minSize: number
  maxSize?: number
  value: number
  isTooBig?: boolean
  isTooSmall?: boolean
}): number => {
  const validMinSize = minSize === 0 ? 1 : minSize
  if (!maxSize) {
    return (value / validMinSize) * 50
  }

  if (isTooSmall) {
    return (value / validMinSize) * 10
  }

  if (isTooBig) {
    return 90 + ((value - maxSize) / validMinSize) * 10
  }

  if (value === minSize) {
    return 10
  }

  if (value === maxSize) {
    return 90
  }

  return 10 + ((value - validMinSize) / (maxSize - validMinSize)) * 80
}

type VolumeSizeProps = {
  /**
   * maximum label below the maxSize
   */
  maxLabel?: string
  maxSize?: number
  /**
   * minimum label below the minSize
   */
  minLabel?: string
  minSize: number
  /**
   * required label below the required size (only when minSize is set and maxSize are not)
   */
  requiredLabel?: string
  size?: Sizes
  /**
   * The title to place above
   */
  title?: string
  /**
   * The message to display when the value is greather than maxSize
   */
  tooBigMessage?: string
  /**
   * The message to display when the value is lower than minSize
   */
  tooSmallMessage?: string
  /**
   * The text to display next to the value, minSize, maxSize
   */
  unit: string
  value: number
}

const VolumeSize = ({
  maxLabel = 'maximum',
  maxSize,
  minLabel = 'minimum',
  minSize,
  requiredLabel = 'required',
  size = 'medium',
  title,
  tooBigMessage = 'Volume capacity exceeded',
  tooSmallMessage = 'Not enough volume allocated',
  unit,
  value,
}: VolumeSizeProps): JSX.Element => {
  const isTooBig = maxSize ? value > maxSize : false
  const isTooSmall = minSize ? value < minSize : false
  const hasError = isTooBig || isTooSmall

  return (
    <StyledComponentContainer>
      <StyledBox role="status" aria-live="polite">
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
      </StyledBox>
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
    </StyledComponentContainer>
  )
}

VolumeSize.propTypes = {
  maxLabel: PropTypes.string,
  maxSize: PropTypes.number,
  minLabel: PropTypes.string,
  minSize: PropTypes.number.isRequired,
  requiredLabel: PropTypes.string,
  size: PropTypes.oneOf<Sizes>(Object.keys(sizes) as Sizes[]),
  title: PropTypes.string,
  tooBigMessage: PropTypes.string,
  tooSmallMessage: PropTypes.string,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default VolumeSize
