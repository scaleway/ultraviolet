import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
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

const variants = {
  info: ({ theme }) => css`
    background-color: ${theme.colors.zumthor};
    color: ${theme.colors.info};
  `,
  success: ({ theme }) => css`
    background-color: ${theme.colors.foam};
    color: ${theme.colors.success};
  `,
  security: ({ theme }) => css`
    background-color: ${theme.colors.gray100};
    color: ${theme.colors.gray550};
  `,
  warning: ({ theme }) => css`
    background-color: ${theme.colors.pippin};
    color: ${theme.colors.warning};
  `,
  'warning-blue': ({ theme }) => css`
    background-color: ${theme.colors.zumthor};
    color: ${theme.colors.info};
  `,
  'warning-orange': ({ theme }) => css`
    background-color: ${theme.colors.serenade};
    color: ${theme.colors.orange};
  `,
  'alert-orange': ({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.orange};
  `,
  'alert-red': ({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.warning};
  `,
}

const variantStyles = ({ variant, ...props }) => variants[variant]?.(props)

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.default};
  color: ${({ theme }) => theme.colors.white};
  padding: 12px;
  ${variantStyles}
`

const StyledText = styled.p`
  font-size: 16px;
  line-height: 22px;
  padding-left: 16px;
  width: 100%;
`

const NotificationBar = ({ variant, children, iconSize, icon, ...props }) => (
  <StyledContainer variant={variant} {...props}>
    <Icon
      color={colors[variant]}
      name={icon !== '' ? icon : icons[variant]}
      size={iconSize}
    />
    <StyledText>{children}</StyledText>
  </StyledContainer>
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

export default NotificationBar
