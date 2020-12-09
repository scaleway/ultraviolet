import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import {
  borderRadius,
  white,
  gray100,
  gray550,
  info,
  orange,
  success,
  warning,
  zumthor,
  foam,
  serenade,
  pippin,
} from '../../theming'
import { cx } from '../../utils'
import { Box } from '../Box'
import { Icon } from '../Icon'

export const colors = {
  info: 'info',
  success: 'success',
  security: 'gray550',
  warning: 'warning',
  'warning-blue': 'info',
  'warning-orange': 'orange',
  'alert-orange': 'orange',
  'alert-red': 'warning',
}

const icons = {
  success: 'checkbox-marked-circle-outline',
  info: 'information-outline',
  security: 'lock',
  warning: 'alert',
  'warning-blue': 'alert',
  'warning-orange': 'alert',
  'alert-orange': 'alert',
  'alert-red': 'alert',
}

const styles = {
  container: p => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: ${borderRadius(p)};
    color: ${white(p)};
    padding: 12px;
  `,
  text: css`
    font-size: 16px;
    line-height: 22px;
    padding-left: 16px;
    width: 100%;
  `,
}

const variants = {
  info: p => css`
    background-color: ${zumthor(p)};
    color: ${info(p)};
  `,
  success: p => css`
    background-color: ${foam(p)};
    color: ${success(p)};
  `,
  security: p => css`
    background-color: ${gray100(p)};
    color: ${gray550(p)};
  `,
  warning: p => css`
    background-color: ${pippin(p)};
    color: ${warning(p)};
  `,
  'warning-blue': p => css`
    background-color: ${zumthor(p)};
    color: ${info(p)};
  `,
  'warning-orange': p => css`
    background-color: ${serenade(p)};
    color: ${orange(p)};
  `,
  'alert-orange': p => css`
    background-color: ${white(p)};
    color: ${orange(p)};
  `,
  'alert-red': p => css`
    background-color: ${white(p)};
    color: ${warning(p)};
  `,
}

const NotificationBar = ({ variant, children, iconSize, ...props }) => (
  <Box css={cx([styles.container, variants[variant]])} {...props}>
    <Icon color={colors[variant]} name={icons[variant]} size={iconSize} />
    <p css={styles.text}>{children}</p>
  </Box>
)

NotificationBar.defaultProps = {
  iconSize: 24,
  variant: 'warning',
}

export const notificationVariants = Object.keys(variants)

NotificationBar.propTypes = {
  children: PropTypes.node.isRequired,
  iconSize: PropTypes.number,
  variant: PropTypes.oneOf(notificationVariants),
}

export { NotificationBar }
