import { css, keyframes } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../new_theme'
import { Box } from '../Box'

const shineAnimation = keyframes`
  from {
    left: -25%;
  }

  to {
    left: 100%;
  }
`

const styles = {
  line: backgroundColor => css`
    position: relative;
    height: 4px;
    margin-left: 0;
    margin-right: 0;
    border-radius: 2px;
    background-color: ${backgroundColor};
  `,
  filled: ({ variant, value }) => css`
    border-radius: 2px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: ${colors[variant]};
    transition: 0.3s width;
    width: ${Math.max(0, Math.min(100, value))}%;
  `,
  progress: css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 25%;
    opacity: 0.8;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    );
    animation: ${shineAnimation} 1s linear infinite;
  `,
}

export const progressBarVariants = ['primary', 'success', 'warning', 'info']

export function ProgressBar({
  variant,
  backgroundColor,
  value,
  progress,
  ...props
}) {
  return (
    <Box
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      css={styles.line(backgroundColor)}
      {...props}
    >
      {progress ? (
        <div css={styles.progress} />
      ) : (
        <div css={[styles.filled({ variant, value }), styles.progress]} />
      )}
    </Box>
  )
}

ProgressBar.propTypes = {
  variant: PropTypes.oneOf(progressBarVariants),
  backgroundColor: PropTypes.string,
  value: PropTypes.number,
  progress: PropTypes.bool,
}

ProgressBar.defaultProps = {
  variant: 'primary',
  backgroundColor: colors.gray300,
  value: 0,
  progress: false,
}

export default ProgressBar
