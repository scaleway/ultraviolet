import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'
import { Link } from '../Link'

const variants = {
  vertical: ({ theme }) => css`
    > * {
      margin-top: 0;
    }
    > * + * {
      margin-top: ${theme.space['2']};
    }
  `,
}

const linkStyles = ({ theme }) =>
  css`
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
    &:hover,
    &:focus {
      text-decoration: none;
      border-color: ${theme.colors.primary};
      box-shadow: 2px 2px 14px 8px ${theme.colors.gray200};
    }
  `

const StyledBox = styled(Box, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})`
  padding: ${({ theme: { space } }) => space['3']};
  border-radius: ${({ theme: { radii } }) => radii.default};
  border: 1px solid ${({ theme: { colors } }) => colors.gray350};
  ${({ variant }) =>
    Object.keys(variants).includes(variant) && variants[variant]}
  ${({ to, href }) => (to || href) && linkStyles}
`

const BorderedBox = ({ children, variant, to, href, as, ...props }) => (
  <StyledBox
    variant={variant}
    as={to || href ? Link : as}
    to={to}
    href={href}
    {...props}
  >
    {children}
  </StyledBox>
)

BorderedBox.propTypes = {
  variant: PropTypes.oneOf(['horizontal', 'vertical']),
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  as: PropTypes.string,
}

BorderedBox.defaultProps = {
  variant: 'horizontal',
  to: undefined,
  href: undefined,
  as: 'div',
}

export default BorderedBox
