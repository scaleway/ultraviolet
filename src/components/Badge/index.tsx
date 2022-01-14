import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { FunctionComponent, useMemo } from 'react'
import Box, { BoxProps } from '../Box'

const variants = {
  beta: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.warning.backgroundStrong};
    color: ${colors.warning.textStrong};
  `,
  error: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.danger.backgroundStrong};
    color: ${colors.danger.textStrong};
  `,
  info: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.info.backgroundStrong};
    color: ${colors.info.textStrong};
  `,
  'light-beta': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.warning.text};
    background-color: ${colors.warning.background};
  `,
  'light-error': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.danger.text};
    background-color: ${colors.danger.background};
  `,
  'light-info': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.info.text};
    background-color: ${colors.info.background};
  `,
  'light-neutral': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.neutral.text};
    background-color: ${colors.neutral.background};
  `,
  'light-primary': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.primary.text};
    background-color: ${colors.primary.background};
  `,
  'light-success': ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.success.text};
    background-color: ${colors.success.background};
  `,
  neutral: ({ theme: { colors } }: { theme: Theme }) => css`
    color: ${colors.neutral.text};
    background-color: ${colors.neutral.background};
  `,
  primary: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.primary.backgroundStrong};
    color: ${colors.primary.textStrong};
  `,
  success: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.success.backgroundStrong};
    color: ${colors.success.textStrong};
  `,
  warning: ({ theme: { colors } }: { theme: Theme }) => css`
    background-color: ${colors.danger.backgroundStrong};
    color: ${colors.danger.textStrong};
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
} & BoxProps

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
