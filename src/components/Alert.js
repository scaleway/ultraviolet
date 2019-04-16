import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { cx, sp, thColor } from 'utils'
import { Typography } from './Typography'
import { Icon } from './Icon'

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

export function Alert({ variant = 'warning', icon, children, ...props }) {
  return (
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
}

Alert.propTypes = {
  variant: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node,
}
