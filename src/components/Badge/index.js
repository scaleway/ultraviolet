import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import {
  beta,
  bigBorderRadius,
  borderRadius,
  foam,
  gray100,
  gray350,
  gray550,
  gray700,
  info,
  pippin,
  red,
  serenade,
  success,
  warning,
  white,
  zumthor,
} from '../../theming'
import { cx, sp } from '../../utils'
import { Box } from '../Box'

const variants = {
  success: p => css`
    background-color: ${success(p)};
  `,
  'light-success': p => css`
    color: ${success(p)};
    background-color: ${foam(p)};
  `,
  beta: p => css`
    background-color: ${beta(p)};
  `,
  'light-beta': p => css`
    color: ${beta(p)};
    background-color: ${serenade(p)};
  `,
  warning: p => css`
    background-color: ${warning(p)};
  `,
  'light-error': p => css`
    color: ${red(p)};
    background-color: ${pippin(p)};
  `,
  error: p => css`
    background-color: ${red(p)};
  `,
  info: p => css`
    background-color: ${info(p)};
  `,
  'light-info': p => css`
    color: ${info(p)};
    background-color: ${zumthor(p)};
  `,
  'light-neutral': p => css`
    color: ${gray550(p)};
    background-color: ${gray100(p)};
  `,
  neutral: p => css`
    color: ${gray700(p)};
    background-color: ${gray350(p)};
  `,
}

const sizes = {
  rounded: p => {
    const height = sp(2)(p)
    const paddingVertical = sp(0.25)(p)
    const paddingHorizontal = sp(0.75)(p)
    return css`
      border-radius: ${bigBorderRadius(p)};
      font-size: 10px;
      height: ${height};
      padding: ${paddingVertical} ${paddingHorizontal};
      text-transform: uppercase;
    `
  },
  md: p => {
    const height = sp(4)(p)
    return css`
      font-size: 14px;
      line-height: ${height};
      height: ${height};
    `
  },
  sm: p => {
    const height = sp(3)(p)
    return css`
      font-size: 12px;
      line-height: ${height};
      height: ${height};
    `
  },
  xs: p => {
    const height = sp(2.25)(p)
    return css`
      border-radius: ${borderRadius(p)};
      font-size: 12px;
      line-height: ${height};
      height: ${height};
    `
  },
  xxs: p => {
    const height = sp(2)(p)
    const padding = sp(0.75)(p)
    return css`
      border-radius: ${borderRadius(p)};
      font-size: 10px;
      line-height: ${height};
      height: ${height};
      padding: 0 ${padding};
    `
  },
}

const style = p => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${white(p)};
  white-space: nowrap;
  border-radius: ${sp(2)(p)};
  padding: 0 ${sp(2)(p)};
  width: fit-content;
`

const Badge = ({ variant, size, ...props }) => (
  <Box as="span" css={cx([style, variants[variant], sizes[size]])} {...props} />
)

export const badgeVariants = Object.keys(variants)
export const badgeSizes = Object.keys(sizes)

Badge.propTypes = {
  variant: PropTypes.oneOf(badgeVariants),
  size: PropTypes.oneOf(badgeSizes),
}

Badge.defaultProps = {
  variant: 'neutral',
  size: 'md',
}

export { Badge }
