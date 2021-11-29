import { SerializedStyles, Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNode } from 'react'
import { useUUID } from '../../utils'
import Box, { XStyledProps } from '../Box'
import Icon, { IconName, icons } from '../Icon'
import Typography from '../Typography'

export const alertTypes = ['beta', 'info', 'success', 'warning'] as const
export const alertVariants = [
  'filled',
  'standard',
  'outlined',
  'transparent',
] as const
type AlertType = typeof alertTypes[number]
type AlertVariant = typeof alertVariants[number]

const typesColors = (
  theme: Theme,
): Record<AlertType, { primary: string; secondary: string }> => ({
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

const variants = ({
  type,
  theme,
}: {
  theme: Theme
  type: AlertType
}): Record<AlertVariant, SerializedStyles> => {
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

type ContainerProps = { variant: AlertVariant; type: AlertType }
const variantStyles = ({
  variant,
  ...props
}: ContainerProps & { theme: Theme }) =>
  variants(props)[variant] || variants(props).standard

const typesDefaultIcons: Record<AlertType, IconName> = {
  beta: 'alert',
  info: 'information-outline',
  success: 'checkbox-marked-circle-outline',
  warning: 'alert',
}

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['type', 'variant'].includes(prop.toString()),
})<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 12px;
  ${variantStyles}
`

const StyledBox = styled(Box)<{ color: string }>`
  display: flex;
  flex-direction: column;
`

type TitleProps = {
  color: string
  text: string
}
const Title = ({ color, text }: TitleProps) => (
  <Typography variant="description" color={color} ml={2}>
    {text}
  </Typography>
)

export type AlertProps = {
  variant?: AlertVariant
  children: ReactNode
  iconSize?: number
  icon?: IconName
  title?: string
  type?: AlertType
} & XStyledProps

const Alert: FunctionComponent<AlertProps> = ({
  variant = 'standard',
  children,
  iconSize = 32,
  icon,
  title,
  type = 'warning',
  ...props
}) => (
  <StyledContainer
    role="region"
    aria-label={useUUID(type)}
    type={type}
    variant={variant}
    {...props}
  >
    <Icon
      name={icon || typesDefaultIcons[type]}
      size={iconSize}
      aria-hidden="true"
    />
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

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.oneOf(icons),
  iconSize: PropTypes.number,
  /**
   * Add a title at the top of your alert.
   */
  title: PropTypes.string,
  type: PropTypes.oneOf<AlertType>(alertTypes),
  variant: PropTypes.oneOf<AlertVariant>(alertVariants),
}

export default Alert
