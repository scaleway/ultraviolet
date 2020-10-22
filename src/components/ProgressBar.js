import { css, keyframes } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { gray300 } from 'theming'
import { cx, thColor } from 'utils'
import { Box } from './Box'

const shineAnimation = keyframes`
  from {
    left: -25%;
  }

  to {
    left: 100%;
  }
`

const styles = {
  line: p => css`
    position: relative;
    height: 4px;
    margin-left: 0;
    margin-right: 0;
    border-radius: 2px;
    background-color: ${gray300(p)};
  `,
  filled: ({ variant, value }) => p => css`
    border-radius: 2px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: ${thColor(variant)(p)};
    transition: 0.3s width;
    width: ${value}%;
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
  variant = 'primary',
  value = 0,
  progress,
  ...props
}) {
  return (
    <Box
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      css={cx(styles.line)}
      {...props}
    >
      {progress ? (
        <div css={cx(styles.progress)} />
      ) : (
        <div css={cx(styles.filled({ variant, value }), styles.progress)} />
      )}
    </Box>
  )
}

ProgressBar.propTypes = {
  variant: PropTypes.oneOf(progressBarVariants),
  value: PropTypes.number,
  progress: PropTypes.bool,
}

export default ProgressBar
