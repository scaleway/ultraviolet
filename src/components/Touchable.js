import React from 'react'
import { css } from '@emotion/core'
import { cx } from 'utils'
import { Box } from './Box'

const styles = {
  touchable: css`
    border: 0;
    transition: opacity 150ms;
    user-select: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
    appearance: none;
  `,
  disabled: css`
    cursor: default;
    opacity: 0.5;
  `,
}

export function Touchable({ disabled, as = 'button', type, ...props }) {
  return (
    <Box
      css={cx([styles.touchable, disabled && styles.disabled])}
      as={as}
      type={as === 'button' ? 'button' : type}
      disabled={as === 'button' ? disabled : undefined}
      {...props}
    />
  )
}
