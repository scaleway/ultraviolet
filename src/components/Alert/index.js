import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
import Icon from '../Icon'
import Typography from '../Typography'

const variants = {
  beta: ({ theme }) => css`
    background-color: ${theme.colors.serenade};
    color: ${theme.colors.beta};
  `,
  info: ({ theme }) => css`
    background-color: ${theme.colors.zumthor};
    color: ${theme.colors.info};
  `,
  success: ({ theme }) => css`
    background-color: ${theme.colors.foam};
    color: ${theme.colors.success};
  `,
  warning: ({ theme }) => css`
    background-color: ${theme.colors.pippin};
    color: ${theme.colors.warning};
  `,
}

const variantsDefaultIcons = {
  beta: 'alert',
  info: 'information-outline',
  success: 'checkbox-marked-circle-outline',
  warning: 'alert',
}

export const alertVariants = Object.keys(variants)

const variantStyles = ({ variant, ...props }) => variants[variant]?.(props)

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['variant', 'hasBackground'].includes(prop),
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.default};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ hasBackground }) => (hasBackground ? '12px' : '0')};
  ${variantStyles}
  ${({ hasBackground }) => !hasBackground && 'background-color: transparent'}
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
  hasBackground,
  ...props
}) => {
  const theme = useTheme()
  const color = theme.colors[variant]

  return (
    <StyledContainer variant={variant} hasBackground={hasBackground} {...props}>
      <Icon
        color={color}
        name={icon || variantsDefaultIcons[variant]}
        size={iconSize}
      />
      <StyledBox>
        {title && <Title color={color} text={title} />}
        <Typography variant="bodyA" color={color} ml={2}>
          {children}
        </Typography>
      </StyledBox>
    </StyledContainer>
  )
}

Title.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

Alert.defaultProps = {
  hasBackground: true,
  icon: undefined,
  iconSize: 32,
  title: undefined,
  variant: 'warning',
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Will remove background color if set to `false`.
   */
  hasBackground: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  /**
   * Add a title at the top of your alert.
   */
  title: PropTypes.string,
  variant: PropTypes.oneOf(alertVariants),
}

export default Alert
