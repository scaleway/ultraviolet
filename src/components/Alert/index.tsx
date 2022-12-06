import { SerializedStyles, Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
import Icon from '../Icon'
import Stack from '../Stack'
import Text from '../Text'

type AlertType = 'danger' | 'info' | 'success' | 'warning'

const alertStyles = ({
  theme,
  variant,
}: {
  theme: Theme
  variant: AlertType
}): SerializedStyles => {
  const sentiment = theme.colors[variant] || theme.colors.danger

  return css`
    background-color: ${sentiment.background};
    color: ${sentiment.text};
  `
}

const typesDefaultIcons: Record<
  AlertType,
  ComponentProps<typeof Icon>['name']
> = {
  warning: 'alert',
  info: 'information-outline',
  success: 'checkbox-marked-circle-outline',
  danger: 'alert',
}

const StyledStackContainer = styled(Stack, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})<{ variant: AlertType }>`
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
  variant?: AlertType
  className?: string
}

const Alert = ({
  children,
  icon,
  title,
  variant = 'danger',
  className,
}: AlertProps) => (
  <StyledStackContainer
    direction="row"
    alignItems="center"
    justifyContent="flex-start"
    variant={variant}
    className={className}
    gap={2}
  >
    <Icon
      name={icon || typesDefaultIcons[variant]}
      size={24}
      aria-hidden="true"
    />
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
