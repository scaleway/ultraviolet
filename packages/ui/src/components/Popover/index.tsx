import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

type VariantType = 'default' | 'primary'

const SIZES_WIDTH = {
  small: 320,
  medium: 420,
  large: 520,
}

const StyledTooltip = styled(Tooltip, {
  shouldForwardProp: prop => !['variant', 'size'].includes(prop),
})<{
  variant: VariantType
  size: keyof typeof SIZES_WIDTH
}>`
  padding: ${({ theme }) => theme.space['2']};
  width: ${({ size }) => SIZES_WIDTH[size]}px;
  max-width: ${({ size }) => SIZES_WIDTH[size]}px;
  text-align: initial;

  ${({ theme, variant }) => {
    if (variant === 'default') {
      return `
      background: ${theme.colors.neutral.background};
      box-shadow: ${theme.shadows.popover};
      &::after {
        border-color: ${theme.colors.neutral.background} transparent transparent transparent;
      }
      `
    }

    return `
      background: ${theme.colors.primary.backgroundStrong};
      box-shadow: ${theme.shadows.popover};
      &::after {
        border-color: ${theme.colors.primary.backgroundStrong} transparent transparent transparent;
      }
      `
  }}
`

type ContentWrapperProps = Pick<
  PopoverProps,
  'title' | 'onClose' | 'variant' | 'children'
>

const ContentWrapper = ({
  title,
  onClose,
  children,
  variant,
}: ContentWrapperProps) => (
  <Stack gap={1}>
    <Stack direction="row" justifyContent="space-between">
      <Text
        variant="headingSmall"
        as="h3"
        prominence={variant === 'default' ? 'strong' : 'stronger'}
      >
        {title}
      </Text>
      <ButtonV2
        variant="ghost"
        sentiment={variant}
        onClick={onClose}
        icon="close"
      />
    </Stack>
    {typeof children === 'string' ? (
      <Text
        variant="bodySmall"
        as="p"
        prominence={variant === 'default' ? 'strong' : 'stronger'}
      >
        {children}
      </Text>
    ) : (
      children
    )}
  </Stack>
)

type PopoverProps = {
  children: ReactNode
  content: ReactNode
  title: string
  variant?: VariantType
  visible?: boolean
  size?: keyof typeof SIZES_WIDTH
  onClose?: () => void
  className?: string
  'data-testid'?: string
} & Pick<ComponentProps<typeof Tooltip>, 'placement'>

export const Popover = ({
  visible = false,
  children,
  placement,
  content,
  title,
  variant = 'default',
  size = 'medium',
  onClose,
  className,
  'data-testid': dataTestId,
}: PopoverProps) => {
  const [opened, setOpened] = useState(visible)

  useEffect(() => {
    setOpened(visible)
  }, [visible])

  const onCloseCallBack = useCallback(() => {
    setOpened(false)
    onClose?.()
  }, [onClose])

  return (
    <StyledTooltip
      visible={opened}
      placement={placement}
      text={
        <ContentWrapper
          title={title}
          onClose={onCloseCallBack}
          variant={variant}
        >
          {content}
        </ContentWrapper>
      }
      className={className}
      variant={variant}
      data-testid={dataTestId}
      size={size}
      role="dialog"
    >
      {children}
    </StyledTooltip>
  )
}
