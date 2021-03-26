import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import { radii, colors as themeColors } from '../../theme'
import { Box } from '../Box'
import Icon from '../Icon'

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
  container: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: ${radii.default};
    color: ${themeColors.white};
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
  info: css`
    background-color: ${themeColors.zumthor};
    color: ${themeColors.info};
  `,
  success: css`
    background-color: ${themeColors.foam};
    color: ${themeColors.success};
  `,
  security: css`
    background-color: ${themeColors.gray100};
    color: ${themeColors.gray550};
  `,
  warning: css`
    background-color: ${themeColors.pippin};
    color: ${themeColors.warning};
  `,
  'warning-blue': css`
    background-color: ${themeColors.zumthor};
    color: ${themeColors.info};
  `,
  'warning-orange': css`
    background-color: ${themeColors.serenade};
    color: ${themeColors.orange};
  `,
  'alert-orange': css`
    background-color: ${themeColors.white};
    color: ${themeColors.orange};
  `,
  'alert-red': css`
    background-color: ${themeColors.white};
    color: ${themeColors.warning};
  `,
}

const NotificationBar = ({ variant, children, iconSize, icon, ...props }) => (
  <Box css={[styles.container, variants[variant]]} {...props}>
    <Icon
      color={colors[variant]}
      name={icon !== '' ? icon : icons[variant]}
      size={iconSize}
    />
    <p css={styles.text}>{children}</p>
  </Box>
)

NotificationBar.defaultProps = {
  icon: '',
  iconSize: 24,
  variant: 'warning',
}

export const notificationVariants = Object.keys(variants)

NotificationBar.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  variant: PropTypes.oneOf(notificationVariants),
}

export { NotificationBar }
