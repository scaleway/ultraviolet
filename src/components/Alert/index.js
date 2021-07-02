import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
import Icon from '../Icon'
import Typography from '../Typography'

const typesColors = theme => ({
  beta: {
    primary: theme.colors.beta,
    secondary: theme.colors.serenade,
  },
  info: {
    primary: theme.colors.info,
    secondary: theme.colors.zumthor,
  },
  success: {
    primary: theme.colors.success,
    secondary: theme.colors.foam,
  },
  warning: {
    primary: theme.colors.warning,
    secondary: theme.colors.pippin,
  },
})

const variants = ({ type, theme }) => {
  const primary = typesColors(theme)[type]?.primary || theme.colors.warning
  const secondary = typesColors(theme)[type]?.secondary || theme.colors.pippin

  return {
    filled: css`
      background-color: ${primary};
      color: ${theme.colors.white};
    `,
    outlined: css`
      border: 1px solid ${primary};
      color: ${primary};
    `,
    standard: css`
      background-color: ${secondary};
      color: ${primary};
    `,
    transparent: css`
      background-color: transparent;
      color: ${primary};
      padding: 12px 0;
    `,
  }
}

const variantStyles = ({ variant, ...props }) =>
  variants(props)[variant] || variants(props).standard

export const alertTypes = ['beta', 'info', 'success', 'warning']
export const alertVariants = ['filled', 'standard', 'outlined', 'transparent']

const typesDefaultIcons = {
  beta: 'alert',
  info: 'information-outline',
  success: 'checkbox-marked-circle-outline',
  warning: 'alert',
}

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['type', 'variant'].includes(prop),
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 12px;
  ${variantStyles}
`

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
`

const Title = ({ color, text }) => (
  <Typography variant="description" color={color} ml={2}>
    {text}
  </Typography>
)

const Alert = ({
  variant,
  children,
  iconSize,
  icon,
  title,
  type,
  ...props
}) => (
  <StyledContainer type={type} variant={variant} {...props}>
    <Icon name={icon || typesDefaultIcons[type]} size={iconSize} />
    <StyledBox color="inherit">
      {title && <Title text={title} color="inherit" />}
      <Typography variant="bodyA" color="inherit" ml={2}>
        {children}
      </Typography>
    </StyledBox>
  </StyledContainer>
)

Title.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

Alert.defaultProps = {
  icon: undefined,
  iconSize: 32,
  title: undefined,
  type: 'warning',
  variant: 'standard',
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  /**
   * Add a title at the top of your alert.
   */
  title: PropTypes.string,
  type: PropTypes.oneOf(alertTypes),
  variant: PropTypes.oneOf(alertVariants),
}

export default Alert
