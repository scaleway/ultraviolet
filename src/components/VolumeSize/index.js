import { css, keyframes } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../theme'
import { Box } from '../Box'
import Icon from '../Icon'
import { Typography } from '../Typography'

const sizes = {
  xsmall: 0.5,
  small: 0.7,
  medium: 1,
  large: 1.3,
  xlarge: 1.5,
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

const styles = {
  container: size => css`
    display: flex;
    align-items: center;
    position: relative;

    height: ${(sizes[size] || 1) * 15}px;
    width: 100%;
  `,
  cursor: size => css`
    background-color: ${colors.gray950};
    position: absolute;
    height: ${(sizes[size] || 1) * 15}px;
    width: ${(sizes[size] || 1) * 3}px;
  `,
  label: type => css`
    text-align: ${type === 'min' ? 'left' : 'right'};
  `,
  labelContainer: (type, size) => css`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    font-weight: 500;
    line-height: ${(sizes[size] || 1) * 8}px;

    position: absolute;
    top: 32px;
    ${type === 'min' ? `left: 0;` : `right: 0;`}
  `,
  minSizeCursor: hasMaxSize => css`
    left: ${hasMaxSize ? '10%' : '50%'};
    transform: translateX(${hasMaxSize ? '0' : '-50%'});
  `,
  maxSizeCursor: css`
    right: 10%;
  `,
  title: css`
    margin-right: 5px;
  `,
  value: hasError => css`
    font-weight: 800;
    color: ${hasError ? colors.orange : colors.gray950};
  `,
  volume: (percentUsed, hasError) => css`
    background-color: ${hasError ? colors.orange : colors.green};
    border-radius: ${percentUsed >= 100 ? '3px' : '3px 0 0 3px'};
    position: absolute;
    left: 0;
    height: 100%;
    width: ${percentUsed}%;
    min-width: 0;
    max-width: 100%;
    transition: width 1000ms ease;
    animation-iteration-count: 1;
    animation: ${widthGrow} 1.2s ease backwards;
  `,
  volumeContainer: size => css`
    background-color: ${colors.gray200};
    border-radius: 3px;
    position: relative;

    height: ${(sizes[size] || 1) * 6}px;
    width: 100%;
  `,
}

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
  const isTooBig = maxSize ? value > maxSize : value > minSize
  const isTooSmall = value < minSize
  const hasError = isTooBig || isTooSmall

  return (
    <Box mb={5}>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="bodyA" mr={2} fontWeight={500}>
          <span css={styles.title}>{title}</span>
          <span css={styles.value(hasError)}>
            {value} {unit}
          </span>
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
      <div css={styles.container(size)}>
        <div css={styles.volumeContainer(size)}>
          <span
            css={styles.volume(
              getPercentUsed({
                minSize,
                maxSize,
                value,
                isTooBig,
                isTooSmall,
              }),
              hasError,
            )}
          />
        </div>
        <div
          css={[styles.cursor(size), styles.minSizeCursor(Boolean(maxSize))]}
        >
          <div css={styles.labelContainer('min', size)}>
            <div css={styles.label('min')}>
              {minSize} {unit}
            </div>
            <Typography variant="bodyC">
              {maxSize ? minLabel : requiredLabel}
            </Typography>
          </div>
        </div>
        {maxSize && (
          <div css={[styles.cursor(size), styles.maxSizeCursor]}>
            <div css={styles.labelContainer('max', size)}>
              <div css={styles.label('max')}>
                {maxSize} {unit}
              </div>
              <Typography variant="bodyC">{maxLabel}</Typography>
            </div>
          </div>
        )}
      </div>
    </Box>
  )
}

VolumeSize.propTypes = {
  maxLabel: PropTypes.string,
  maxSize: PropTypes.number,
  minLabel: PropTypes.string,
  minSize: PropTypes.number.isRequired,
  requiredLabel: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(sizes)),
  title: PropTypes.string,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  tooBigMessage: PropTypes.string,
  tooSmallMessage: PropTypes.string,
}

VolumeSize.defaultProps = {
  maxSize: undefined,
  maxLabel: 'maximum',
  minLabel: 'minimum',
  requiredLabel: 'required',
  size: 'medium',
  title: undefined,
  tooBigMessage: 'Volume capacity exceeded',
  tooSmallMessage: 'Not enough volume allocated',
}

export { VolumeSize }
