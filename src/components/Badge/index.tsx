import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, useMemo } from 'react'
import Box, { XStyledProps } from '../Box'

const variants = {
  beta: ({ theme: { colorTokens } }: { theme: Theme }) => css`
    background-color: ${colorTokens.warning.backgroundStrong};
    color: ${colorTokens.warning.textStrong};
  `,
  error: ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    background-color: ${colorsDeprecated.red};
    color: ${colorsDeprecated.white};
  `,
  info: ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    background-color: ${colorsDeprecated.info};
    color: ${colorsDeprecated.white};
  `,
  'light-beta': ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    color: ${colorsDeprecated.beta};
    background-color: ${colorsDeprecated.serenade};
  `,
  'light-error': ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    color: ${colorsDeprecated.red};
    background-color: ${colorsDeprecated.pippin};
  `,
  'light-info': ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    color: ${colorsDeprecated.info};
    background-color: ${colorsDeprecated.zumthor};
  `,
  'light-neutral': ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    color: ${colorsDeprecated.gray550};
    background-color: ${colorsDeprecated.gray100};
  `,
  'light-primary': ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    color: ${colorsDeprecated.primary};
    background-color: ${colorsDeprecated.gray200};
  `,
  'light-success': ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    color: ${colorsDeprecated.success};
    background-color: ${colorsDeprecated.foam};
  `,
  neutral: ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    color: ${colorsDeprecated.gray700};
    background-color: ${colorsDeprecated.gray350};
  `,
  primary: ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    background-color: ${colorsDeprecated.primary};
    color: ${colorsDeprecated.white};
  `,
  success: ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    background-color: ${colorsDeprecated.success};
    color: ${colorsDeprecated.white};
  `,
  warning: ({ theme: { colorsDeprecated } }: { theme: Theme }) => css`
    background-color: ${colorsDeprecated.warning};
    color: ${colorsDeprecated.white};
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

type Variants = keyof typeof variants
type Sizes = keyof typeof sizes

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

type BadgeProps = {
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
