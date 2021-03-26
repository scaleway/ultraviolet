import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
<<<<<<< HEAD
=======
import { colors, space } from '../../theme'
>>>>>>> refactor: migrate colors from theme in icon (#160)
import Icon, { icons } from '../Icon'
import { Typography } from '../Typography'

const variantIcons = {
  warning: 'alert',
  info: 'information-outline',
  success: 'check',
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
  variant: PropTypes.oneOf(alertVariants),
  icon: PropTypes.oneOf(icons),
  iconSize: PropTypes.number,
  children: PropTypes.node.isRequired,
}

Alert.defaultProps = {
  variant: 'warning',
  icon: null,
  iconSize: 40,
}

export default Alert
