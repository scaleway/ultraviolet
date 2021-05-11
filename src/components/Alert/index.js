import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Icon, { icons } from '../Icon'
import Typography from '../Typography'

const variantIcons = {
  info: 'information-outline',
  success: 'check',
  warning: 'alert',
}

const StyledAlert = styled(Typography)`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space['2']};
  font-weight: 700;
`

export const alertVariants = Object.keys(variantIcons)

const Alert = ({ variant, icon, children, iconSize, ...props }) => (
  <StyledAlert variant="default" role="alert" color={variant} {...props}>
    <Icon
      mr={2}
      name={icon || variantIcons[variant]}
      size={iconSize}
      color={variant}
    />
    <span>{children}</span>
  </StyledAlert>
)

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.oneOf(icons),
  iconSize: PropTypes.number,
  variant: PropTypes.oneOf(alertVariants),
}

Alert.defaultProps = {
  icon: null,
  iconSize: 40,
  variant: 'warning',
}

export default Alert
