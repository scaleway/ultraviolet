import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, useMemo } from 'react'
import Box, { XStyledProps } from '../Box'

const variants = {
  beta: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.beta};
    color: ${colors.white};
  `,
  error: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.red};
    color: ${colors.white};
  `,
  info: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.info};
    color: ${colors.white};
  `,
  'light-beta': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.beta};
    background-color: ${colors.serenade};
  `,
  'light-error': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.red};
    background-color: ${colors.pippin};
  `,
  'light-info': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.info};
    background-color: ${colors.zumthor};
  `,
  'light-neutral': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.gray550};
    background-color: ${colors.gray100};
  `,
  'light-primary': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.primary};
    background-color: ${colors.gray200};
  `,
  'light-success': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.success};
    background-color: ${colors.foam};
  `,
  neutral: ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.gray700};
    background-color: ${colors.gray350};
  `,
  primary: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.primary};
    color: ${colors.white};
  `,
  success: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.success};
    color: ${colors.white};
  `,
  warning: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.warning};
    color: ${colors.white};
  `,
}

const sizes = {
  medium: ({ theme: { space } }: { theme: Theme }) => css`
    font-size: 14px;
    line-height: ${space['4']};
    height: ${space['4']};
  `,
  rounded: ({ theme: { space, radii } }: { theme: Theme }) => css`
    border-radius: ${radii.large};
    font-size: 10px;
    height: ${space['2']};
    padding: ${space['0.25']} ${space['0.75']};
    text-transform: uppercase;
  `,
  small: ({ theme: { space } }: { theme: Theme }) => css`
    font-size: 12px;
    line-height: ${space['3']};
    height: ${space['3']};
  `,
  xsmall: ({ theme: { space, radii } }: { theme: Theme }) => css`
    border-radius: ${radii.default};
    font-size: 12px;
    line-height: ${space['2.25']};
    height: ${space['2.25']};
  `,
  xxsmall: ({ theme: { space, radii } }: { theme: Theme }) => css`
    border-radius: ${radii.default};
    font-size: 10px;
    line-height: ${space['2']};
    height: ${space['2']};
    padding: 0 ${space['0.75']};
  `,
}

export type Variants = keyof typeof variants
export type Sizes = keyof typeof sizes

export const badgeVariants = Object.keys(variants) as Variants[]
export const badgeSizes = Object.keys(sizes) as Sizes[]

const sizesStyle = ({ size, ...props }: { size?: Sizes; theme: Theme }) =>
  sizes[size as Sizes]?.(props)
const variantsStyle = ({
  variant,
  ...props
}: {
  variant?: Variants
  theme: Theme
}) => variants[variant as Variants]?.(props)

export type BadgeProps = {
  variant?: Variants
  size?: Sizes
} & XStyledProps

const StyledBox = styled(Box, {
  shouldForwardProp: prop => !['variant', 'size'].includes(prop.toString()),
})<BadgeProps>`
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

const Badge: FunctionComponent<BadgeProps> = ({
  variant = 'neutral',
  size = 'medium',
  ...props
}) => {
  /**
   * Badge should display an aria-label if the status is not neutral or primary
   */
  const ariaLabel = useMemo(() => {
    const strippedVariant = variant.replace('light-', '')

    return ['neutral', 'primary'].some(
      baseVariant => baseVariant === strippedVariant,
    )
      ? undefined
      : strippedVariant
  }, [variant])

  return (
    <StyledBox
      role="status"
      aria-label={ariaLabel}
      as="span"
      variant={variant}
      size={size}
      {...props}
    />
  )
}

Badge.propTypes = {
  size: PropTypes.oneOf<Sizes>(badgeSizes),
  variant: PropTypes.oneOf(badgeVariants),
}

export default Badge
