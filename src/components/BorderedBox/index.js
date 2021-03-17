import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'
import { Link } from '../Link'

const spacedChildren = css`
  > * {
    margin-top: 0;
  }
  > * + * {
    margin-top: ${({ theme: { space } }) => space['2']};
  }
`

const linkStyle = css`
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  &:hover,
  &:focus {
    text-decoration: none;
    border-color: ${({ theme: { colors } }) => colors.primary};
    box-shadow: 2px 2px 14px 8px ${({ theme: { colors } }) => colors.gray200};
  }
`

const StyledBox = styled(Box)`
  padding: ${({ theme: { space } }) => space['3']};
  border-radius: ${({ theme: { radii } }) => radii.default};
  border: 1px solid ${({ theme: { colors } }) => colors.gray350};

  ${({ variant }) => variant === 'vertical' && spacedChildren}

  ${({ to, href }) => (to || href) && linkStyle}
`

const BorderedBox = ({ children, variant, to, href, as, ...props }) => (
  <StyledBox as={to || href ? Link : as} to={to} href={href} {...props}>
    {children}
  </StyledBox>
)

BorderedBox.propTypes = {
  variant: PropTypes.string,
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
