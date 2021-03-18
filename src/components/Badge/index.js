import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'

const variants = {
  primary: ({ colors }) => `
    background-color: ${colors.primary};
  `,
  'light-primary': ({ colors }) => `
    color: ${colors.primary};
    background-color: ${colors.gray200};
  `,
  success: ({ colors }) => `
    background-color: ${colors.success};
  `,
  'light-success': ({ colors }) => `
    color: ${colors.success};
    background-color: ${colors.foam};
  `,
  beta: ({ colors }) => `
    background-color: ${colors.beta};
  `,
  'light-beta': ({ colors }) => `
    color: ${colors.beta};
    background-color: ${colors.serenade};
  `,
  warning: ({ colors }) => `
    background-color: ${colors.warning};
  `,
  'light-error': ({ colors }) => `
    color: ${colors.red};
    background-color: ${colors.pippin};
  `,
  error: ({ colors }) => `
    background-color: ${colors.red};
  `,
  info: ({ colors }) => `
    background-color: ${colors.info};
  `,
  'light-info': ({ colors }) => `
    color: ${colors.info};
    background-color: ${colors.zumthor};
  `,
  'light-neutral': ({ colors }) => `
    color: ${colors.gray550};
    background-color: ${colors.gray100};
  `,
  neutral: ({ colors }) => `
    color: ${colors.gray700};
    background-color: ${colors.gray350};
  `,
}

const sizes = {
  rounded: ({ space, radii }) => `
    border-radius: ${radii.large};
    font-size: 10px;
    height: ${space['2']};
    padding: ${space['0.25']} ${space['0.75']};
    text-transform: uppercase;
  `,
  medium: ({ space }) => `
    font-size: 14px;
    line-height: ${space['4']};
    height: ${space['4']};
  `,
  small: ({ space }) => `
    font-size: 12px;
    line-height: ${space['3']};
    height: ${space['3']};
  `,
  xsmall: ({ space, radii }) => `
    border-radius: ${radii.default};
    font-size: 12px;
    line-height: ${space['2.25']};
    height: ${space['2.25']};
  `,
  xxsmall: ({ space, radii }) => `
    border-radius: ${radii.default};
    font-size: 10px;
    line-height: ${space['2']};
    height: ${space['2']};
    padding: 0 ${space['0.75']};
  `,
}

const StyledBox = styled(Box, {
  shouldForwardProp: prop => !['variant', 'size'].includes(prop),
})(
  ({ theme, variant, size }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  white-space: nowrap;
  border-radius: ${theme.space['2']};
  padding: 0 ${theme.space['2']};
  width: fit-content;

  ${variants[variant]?.(theme)}
  ${sizes[size]?.(theme)}
`,
)

const Badge = ({ variant, size, ...props }) => (
  <StyledBox as="span" variant={variant} size={size} {...props} />
)

export const badgeVariants = Object.keys(variants)
export const badgeSizes = Object.keys(sizes)

Badge.propTypes = {
  variant: PropTypes.oneOf(badgeVariants),
  size: PropTypes.oneOf(badgeSizes),
}

Badge.defaultProps = {
  variant: 'neutral',
  size: 'medium',
}

export default Badge
