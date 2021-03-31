import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { darken } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import Icon from '../Icon'
import { UniversalLink } from '../UniversalLink'

const generateVariant = color => ({ theme }) => css`
  color: ${theme.colors[color] ?? color};
  &:hover,
  &:focus {
    color: ${darken(0.2, theme.colors[color] ?? color)};
  }
`

const variants = {
  blue: generateVariant('blue'),
  grey: generateVariant('gray550'), // TODO: deprecated, to be removed soon
  gray: generateVariant('gray550'),
  white: generateVariant('white'),
  primary: ({ theme }) => css`
    color: ${theme.colors.primary};
    &:hover,
    &:focus {
      color: ${theme.colors.primary};
    }
  `,
  inherit: css`
    color: inherit;
    &:hover,
    &:focus {
      color: inherit;
      text-decoration: none;
    }
  `,
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
const Link = ({ variant, children, ...props }) => (
  <StyledLink variant={variant} {...props}>
    {children}
    {props.target === '_blank' && (
      <StyledIcon name="open-in-new" verticalAlign="top" />
    )}
  </StyledLink>
)

Link.defaultProps = {
  target: undefined,
  variant: undefined,
}

Link.propTypes = {
  variant: PropTypes.oneOf(linkVariants),
  target: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Link
