import { SerializedStyles, Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
import { Color } from '../../theme'
import Icon from '../Icon'
import Stack from '../Stack'
import Text from '../Text'

export const alertTypes = ['beta', 'info', 'success', 'warning'] as const
type AlertType = typeof alertTypes[number]

const alertTypeToColorMapping: Record<AlertType, Color> = {
  beta: 'warning',
  info: 'info',
  success: 'success',
  warning: 'danger',
}

const alertStyles = ({
  theme,
  type,
}: ContainerProps & { theme: Theme }): SerializedStyles => {
  const sentiment =
    theme.colors[alertTypeToColorMapping[type]] || theme.colors.danger

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

type ContainerProps = { type: AlertType }

const StyledStackContainer = styled(Stack, {
  shouldForwardProp: prop => !['type'].includes(prop),
})<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => theme.space['2']};
  ${alertStyles}
`

const AlertContainer = styled.div`
  color: inherit;
  display: flex;
  flex-direction: column;
  flex: 1;
`

type TitleProps = {
  text: string
}

const InheritedColorText = styled(Text)`
  color: inherit;
`

const Title = ({ text }: TitleProps) => (
  <InheritedColorText variant="bodyStrong" as="p">
    {text}
  </InheritedColorText>
)

type AlertProps = {
  children: ReactNode
  icon?: ComponentProps<typeof Icon>['name']
  /**
   * Add a title at the top of your alert.
   */
  title?: string
  type?: AlertType
  className?: string
}

const Alert = ({
  children,
  icon,
  title,
  type = 'warning',
  className,
}: AlertProps) => (
  <StyledStackContainer
    direction="row"
    alignItems="center"
    justifyContent="flex-start"
    type={type}
    className={className}
    gap={2}
  >
    <Icon name={icon || typesDefaultIcons[type]} size={24} aria-hidden="true" />
    <AlertContainer>
      {title && <Title text={title} />}
      {typeof children === 'string' ? (
        <InheritedColorText variant="body" as="p">
          {children}
        </InheritedColorText>
      ) : (
        children
      )}
    </AlertContainer>
  </StyledStackContainer>
)

export default Alert
