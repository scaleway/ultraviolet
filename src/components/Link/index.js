import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { darken } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import Icon from '../Icon'
import UniversalLink from '../UniversalLink'

const generateVariant =
  color =>
  ({ theme }) =>
    css`
      color: ${theme.colors[color] ?? color};
      &:hover,
      &:focus {
        color: ${darken(0.2, theme.colors[color] ?? color)};
      }
    `

const variants = {
  blue: generateVariant('blue'),
  gray: generateVariant('gray550'),
  grey: generateVariant('gray550'), // TODO: deprecated, to be removed soon
  inherit: css`
    color: inherit;
    &:hover,
    &:focus {
      color: inherit;
      text-decoration: none;
    }
  `,
  primary: ({ theme }) => css`
    color: ${theme.colors.primary};
    &:hover,
    &:focus {
      color: ${theme.colors.primary};
    }
  `,
  white: generateVariant('white'),
}

export const linkVariants = Object.keys(variants)

const variantStyles = ({ variant }) =>
  Object.keys(variants).includes(variant) ? variants[variant] : undefined

const StyledLink = styled(UniversalLink, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})`
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
const Link = ({ variant, children, target, ...props }) => (
  <StyledLink variant={variant} target={target} {...props}>
    {children}
    {target === '_blank' && (
      <StyledIcon name="open-in-new" verticalAlign="top" />
    )}
  </StyledLink>
)

Link.defaultProps = {
  target: undefined,
  variant: undefined,
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
  variant: PropTypes.oneOf(linkVariants),
}

export default Link
