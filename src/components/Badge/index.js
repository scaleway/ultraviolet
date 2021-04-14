import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'

const variants = {
  primary: ({ theme: { colors } }) => css`
    background-color: ${colors.primary};
    color: ${colors.white};
  `,
  'light-primary': ({ theme: { colors } }) => css`
    color: ${colors.primary};
    background-color: ${colors.gray200};
  `,
  success: ({ theme: { colors } }) => css`
    background-color: ${colors.success};
    color: ${colors.white};
  `,
  'light-success': ({ theme: { colors } }) => css`
    color: ${colors.success};
    background-color: ${colors.foam};
  `,
  beta: ({ theme: { colors } }) => css`
    background-color: ${colors.beta};
    color: ${colors.white};
  `,
  'light-beta': ({ theme: { colors } }) => css`
    color: ${colors.beta};
    background-color: ${colors.serenade};
  `,
  warning: ({ theme: { colors } }) => css`
    background-color: ${colors.warning};
    color: ${colors.white};
  `,
  'light-error': ({ theme: { colors } }) => css`
    color: ${colors.red};
    background-color: ${colors.pippin};
  `,
  error: ({ theme: { colors } }) => css`
    background-color: ${colors.red};
    color: ${colors.white};
  `,
  info: ({ theme: { colors } }) => css`
    background-color: ${colors.info};
    color: ${colors.white};
  `,
  'light-info': ({ theme: { colors } }) => css`
    color: ${colors.info};
    background-color: ${colors.zumthor};
  `,
  'light-neutral': ({ theme: { colors } }) => css`
    color: ${colors.gray550};
    background-color: ${colors.gray100};
  `,
  neutral: ({ theme: { colors } }) => css`
    color: ${colors.gray700};
    background-color: ${colors.gray350};
  `,
}

const sizes = {
  rounded: ({ theme: { space, radii } }) => css`
    border-radius: ${radii.large};
    font-size: 10px;
    height: ${space['2']};
    padding: ${space['0.25']} ${space['0.75']};
    text-transform: uppercase;
  `,
  medium: ({ theme: { space } }) => css`
    font-size: 14px;
    line-height: ${space['4']};
    height: ${space['4']};
  `,
  small: ({ theme: { space } }) => css`
    font-size: 12px;
    line-height: ${space['3']};
    height: ${space['3']};
  `,
  xsmall: ({ theme: { space, radii } }) => css`
    border-radius: ${radii.default};
    font-size: 12px;
    line-height: ${space['2.25']};
    height: ${space['2.25']};
  `,
  xxsmall: ({ theme: { space, radii } }) => css`
    border-radius: ${radii.default};
    font-size: 10px;
    line-height: ${space['2']};
    height: ${space['2']};
    padding: 0 ${space['0.75']};
  `,
}

const sizesStyle = ({ size, ...props }) => sizes[size]?.(props)
const variantsStyle = ({ variant, ...props }) => variants[variant]?.(props)

const StyledBox = styled(Box, {
  shouldForwardProp: prop => !['variant', 'size'].includes(prop),
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.space['2']};
  padding: 0 ${({ theme }) => theme.space['2']};
  width: fit-content;

  ${variantsStyle}
  ${sizesStyle}
`

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
