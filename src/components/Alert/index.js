import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { colors, space } from '../../new_theme'
import { Icon, icons } from '../Icon'
import { Typography } from '../Typography'

const style = ({ variant }) => css`
  display: flex;
  align-items: center;
  margin-bottom: ${space['2']};
  color: ${colors[variant]};
  font-weight: 700;
`

const variantIcons = {
  warning: 'alert',
  info: 'information-outline',
  success: 'check',
}

export const alertVariants = Object.keys(variantIcons)

const Alert = ({ variant, icon, children, iconSize, ...props }) => (
  <Typography
    variant="default"
    css={style({ variant })}
    role="alert"
    {...props}
  >
    <Icon
      mr={2}
      name={icon || variantIcons[variant]}
      size={iconSize}
      color={variant}
    />
    <span>{children}</span>
  </Typography>
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

export { Alert }
