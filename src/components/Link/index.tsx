import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { darken } from 'polished'
import PropTypes from 'prop-types'
import { ComponentProps, ReactNode } from 'react'
import { Color } from '../../theme'
import Icon from '../Icon'
import UniversalLink from '../UniversalLink'

const generateVariant =
  (color: Color | string) =>
  ({ theme }: { theme: Theme }) =>
    css`
      color: ${theme.colors[color as Color]?.text ?? color};
      &:hover,
      &:focus {
        color: ${darken(0.2, theme.colors[color as Color]?.text ?? color)};
      }
    `

const neutral = ({ theme }: { theme: Theme }) =>
  generateVariant(theme.colors.neutral.textWeak)

const variants = {
  blue: generateVariant('info'),
  gray: neutral,
  inherit: () => css`
    color: inherit;
    &:hover,
    &:focus {
      color: inherit;
      text-decoration: none;
    }
  `,
  primary: ({ theme }: { theme: Theme }) => css`
    color: ${theme.colors.primary.text};
    &:hover,
    &:focus {
      color: ${theme.colors.primary.text};
    }
  `,
  white: ({ theme }: { theme: Theme }) =>
    generateVariant(theme.colors.neutral.textStrong),
}

type Variant = keyof typeof variants
export const linkVariants = Object.keys(variants) as Variant[]

const variantStyles = ({ variant }: { variant?: Variant }) =>
  variant && Object.keys(variants).includes(variant)
    ? variants[variant]
    : undefined

type LinkProps = {
  children: ReactNode
  variant?: Variant
  target?: string
} & ComponentProps<typeof UniversalLink>

const StyledLink = styled(UniversalLink, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})<LinkProps>`
  cursor: pointer;
  text-decoration: none;
  transition: color 200ms ease;
  &:hover,
  &:focus {
    text-decoration: underline;
  }
  ${variantStyles}
`

const StyledIcon = styled(Icon)`
  padding-left: 2px;
  opacity: 0.5;
`

const Link = ({ variant, children, target, ...props }: LinkProps) => (
  <StyledLink variant={variant} target={target} {...props}>
    {children}
    {target === '_blank' && (
      <StyledIcon name="open-in-new" verticalAlign="top" />
    )}
  </StyledLink>
)

Link.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
  variant: PropTypes.oneOf<Variant>(linkVariants),
}

export default Link
