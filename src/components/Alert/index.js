import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import { cx, sp, thColor } from '../../utils'
import { Icon, icons } from '../Icon'
import { Typography } from '../Typography'

const style = ({ variant }) => p => css`
  display: flex;
  align-items: center;
  margin-bottom: ${sp(2)(p)};
  color: ${thColor(variant)(p)};
  font-weight: 700;
`

const variantIcons = {
  warning: 'alert',
  info: 'information-outline',
  success: 'check',
}

export const alertVariants = Object.keys(variantIcons)

const Alert = ({ variant = 'warning', icon, children, ...props }) => (
  <Typography css={cx(style({ variant }))} role="alert" {...props}>
    <Icon
      mr={2}
      name={icon || variantIcons[variant]}
      size={40}
      color={variant}
    />
    <span>{children}</span>
  </Typography>
)

Alert.propTypes = {
  variant: PropTypes.oneOf(alertVariants),
  icon: PropTypes.oneOf(icons),
  children: PropTypes.node.isRequired,
}

Alert.defaultProps = {
  variant: 'warning',
  icon: null,
}

export { Alert }
