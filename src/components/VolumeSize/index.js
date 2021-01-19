import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { theme } from '../../theme'
import { Box } from '../Box'
import { Icon } from '../Icon'
import { Typography } from '../Typography'

const styles = {
  container: css`
    display: flex;
    align-items: center;
    position: relative;

    height: 15px;
    width: 100%;
  `,
  cursor: css`
    background-color: ${theme.lightBlack};
    position: absolute;
    height: 15px;
    width: 3px;
  `,
  label: type => css`
    text-align: ${type === 'min' ? 'left' : 'right'};
  `,
  labelContainer: type => css`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    font-weight: 500;
    line-height: 8px;

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
  value: hasError => css`
    font-weight: 800;
    color: ${hasError ? theme.orange : theme.lightBlack};
  `,
  volume: (percentUsed, hasError) => css`
    background-color: ${hasError ? theme.orange : theme.green};
    border-radius: ${percentUsed >= 100 ? '3px' : '3px 0 0 3px'};

    position: absolute;
    left: 0;

    height: 100%;
    width: ${percentUsed}%;
    min-width: 0;
    max-width: 100%;

    transition: width 1000ms ease;
  `,
  volumeContainer: css`
    background-color: ${theme.lightPrimary};
    border-radius: 3px;
    position: relative;

    height: 6px;
    width: 100%;
  `,
}

const getPercentUsed = ({ minSize, maxSize, value, isTooBig, isTooSmall }) => {
  if (!maxSize) {
    return parseInt((value / minSize) * 50, 10)
  }

  if (isTooSmall) {
    return parseInt((value / minSize) * 10, 10)
  }

  if (isTooBig) {
    return parseInt(90 + ((value - maxSize) / minSize) * 10, 10)
  }

  if (value === minSize) {
    return 10
  }

  if (value === maxSize) {
    return 90
  }

  return parseInt(10 + ((value - minSize) / (maxSize - minSize)) * 80, 10)
}

const VolumeSize = ({
  title,
  minSize,
  maxSize,
  value,
  unit,
  tooBigMessage,
  tooSmallMessage,
}) => {
  const [started, setStart] = useState(false)

  useEffect(() => {
    setStart(true)
  }, [])

  const isTooBig = maxSize ? value > maxSize : value > minSize
  const isTooSmall = value < minSize
  const hasError = isTooBig || isTooSmall

  return (
    <Box mb={5}>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="bodyA" mr={2} fontWeight={500}>
          {title}
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
          <Typography variant="bodyA" color="alert">
            {isTooBig ? tooBigMessage : tooSmallMessage}
          </Typography>
        )}
      </Box>
      <div css={styles.container}>
        <div css={styles.volumeContainer}>
          <span
            css={styles.volume(
              started
                ? getPercentUsed({
                    minSize,
                    maxSize,
                    value,
                    isTooBig,
                    isTooSmall,
                  })
                : 0,
              hasError,
            )}
          />
        </div>
        <div css={[styles.cursor, styles.minSizeCursor(Boolean(maxSize))]}>
          <div css={styles.labelContainer('min')}>
            <div css={styles.label('min')}>
              {minSize} {unit}
            </div>
            <Typography variant="bodyC">
              {maxSize ? 'minimum' : 'required'}
            </Typography>
          </div>
        </div>
        {maxSize && (
          <div css={[styles.cursor, styles.maxSizeCursor]}>
            <div css={styles.labelContainer('max')}>
              <div css={styles.label('max')}>
                {maxSize} {unit}
              </div>
              <Typography variant="bodyC">maximum</Typography>
            </div>
          </div>
        )}
      </div>
    </Box>
  )
}

VolumeSize.propTypes = {
  maxSize: PropTypes.number,
  minSize: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  title: PropTypes.string,
  tooBigMessage: PropTypes.string,
  tooSmallMessage: PropTypes.string,
}

VolumeSize.defaultProps = {
  maxSize: undefined,
  title: undefined,
  tooBigMessage: 'Volume capacity exceeded',
  tooSmallMessage: 'Not enough volume allocated',
}

export { VolumeSize }
