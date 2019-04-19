import React from 'react'
import { css } from '@emotion/core'
import { transparentize } from 'polished'
import { cx } from 'utils'
import { primary } from 'theming'
import { Box } from './Box'

const styles = {
  touchable: p => css`
    border: 0;
    transition: opacity 200ms, box-shadow 200ms;
    user-select: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &[type='button'] {
      appearance: none;
    }

    &:focus,
    &:focus-within {
      outline: none;
      box-shadow: 0 0 3px ${transparentize(0.7, primary(p))};
    }
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
