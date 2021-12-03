import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { darken } from 'polished'
import PropTypes from 'prop-types'
import React, { ComponentProps, FunctionComponent, ReactNode } from 'react'
import { Color } from '../../theme/colors'
import Icon from '../Icon'
import UniversalLink from '../UniversalLink'

const generateVariant =
  (color: Color | string) =>
  ({ theme }: { theme: Theme }) =>
    css`
      color: ${theme.colorsDeprecated[color as Color] ?? color};
      &:hover,
      &:focus {
        color: ${darken(0.2, theme.colorsDeprecated[color as Color] ?? color)};
      }
    `

const variants = {
  blue: generateVariant('blue'),
  gray: generateVariant('gray550'),
  grey: generateVariant('gray550'), // TODO: deprecated, to be removed soon
  inherit: () => css`
    color: inherit;
    &:hover,
    &:focus {
      color: inherit;
      text-decoration: none;
    }
  `,
  primary: ({ theme }: { theme: Theme }) => css`
    color: ${theme.colorsDeprecated.primary};
    &:hover,
    &:focus {
      color: ${theme.colorsDeprecated.primary};
    }
  `,
  white: generateVariant('white'),
}

export type Variant = keyof typeof variants
export const linkVariants = Object.keys(variants) as Variant[]

const variantStyles = ({ variant }: { variant?: Variant }) =>
  variant && Object.keys(variants).includes(variant)
    ? variants[variant]
    : undefined

export type LinkProps = {
  children: ReactNode
  variant?: Variant
  target?: string
} & ComponentProps<typeof UniversalLink>

const StyledLink = styled(UniversalLink, {
  shouldForwardProp: prop => !['variant'].includes(prop.toString()),
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

const Link: FunctionComponent<LinkProps> = ({
  variant,
  children,
  target,
  ...props
}) => (
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
