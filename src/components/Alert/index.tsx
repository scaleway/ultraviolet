import { SerializedStyles, Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { ComponentProps, ReactNode } from 'react'
import { Color } from '../../theme'
import Box, { BoxProps } from '../Box'
import Icon, { icons } from '../Icon'
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

const alertTypeToColorMapping: Record<AlertType, Color> = {
  beta: 'warning',
  info: 'info',
  success: 'success',
  warning: 'danger',
}

const alertStyles = ({
  theme,
  type,
  variant,
}: ContainerProps & { theme: Theme }): SerializedStyles => {
  const sentiment =
    theme.colors[alertTypeToColorMapping[type]] || theme.colors.danger

  if (variant === 'filled')
    return css`
      background-color: ${sentiment.backgroundStrong};
      color: ${sentiment.textStrong};
    `
  if (variant === 'transparent')
    return css`
      background-color: transparent;
      color: ${sentiment.textWeak};
      padding: 12px 0;
    `
  if (variant === 'outlined')
    return css`
      border: 1px solid ${sentiment.borderWeak};
      color: ${sentiment.textWeak};
    `

  return css`
    background-color: ${sentiment.background};
    color: ${sentiment.text};
  `
}

const typesDefaultIcons: Record<
  AlertType,
  ComponentProps<typeof Icon>['name']
> = {
  beta: 'alert',
  info: 'information-outline',
  success: 'checkbox-marked-circle-outline',
  warning: 'alert',
}

type ContainerProps = { variant: AlertVariant; type: AlertType }

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['type', 'variant'].includes(prop.toString()),
})<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 12px;
  ${alertStyles}
`

const StyledIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.space[2]};
`

const AlertContainer = styled.div`
  color: inherit;
  display: flex;
  flex-direction: column;
  flex: 1;
`

type TitleProps = {
  color: string
  text: string
}
const Title = ({ color, text }: TitleProps) => (
  <Typography variant="description" color={color}>
    {text}
  </Typography>
)

type AlertProps = {
  variant?: AlertVariant
  children: ReactNode
  iconSize?: number
  icon?: ComponentProps<typeof Icon>['name']
  title?: string
  type?: AlertType
} & BoxProps

const Alert = ({
  variant = 'standard',
  children,
  iconSize = 32,
  icon,
  title,
  type = 'warning',
  ...props
}: AlertProps) => (
  <StyledContainer type={type} variant={variant} {...props}>
    <StyledIcon
      name={icon || typesDefaultIcons[type]}
      size={iconSize}
      aria-hidden="true"
    />
    <AlertContainer>
      {title && <Title text={title} color="inherit" />}
      {typeof children === 'string' ? (
        <Typography variant="bodyA" color="inherit">
          {children}
        </Typography>
      ) : (
        children
      )}
    </AlertContainer>
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
