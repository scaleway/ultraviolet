import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'
import { Link } from '../Link'

const StyledBox = styled(Box)`
  padding: ${({ theme: { space } }) => space['3']};
  border-radius: ${({ theme: { radii } }) => radii.default};
  border: 1px solid ${({ theme: { colors } }) => colors.gray350};

  ${({ variant, theme: { space } }) =>
    variant === 'vertical' &&
    `
      > * {
        margin-top: 0;
      }
      > * + * {
        margin-top: ${space['2']};
      }
    `}

  ${({ to, href, theme: { colors } }) =>
    (to || href) &&
    `
      transition: box-shadow 0.2s ease, border-color 0.2s ease;
      &:hover,
      &:focus {
        text-decoration: none;
        border-color: ${colors.primary};
        box-shadow: 2px 2px 14px 8px
          ${colors.gray200};
      }
    `}
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
