import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { Popup } from '../../internalComponents'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'

type SentimentType = 'neutral' | 'primary'

const SIZES_WIDTH = {
  small: 320,
  medium: 420,
  large: 520,
}

const StyledPopup = styled(Popup, {
  shouldForwardProp: prop => !['sentiment', 'size'].includes(prop),
})<{
  sentiment: SentimentType
  size: keyof typeof SIZES_WIDTH
}>`
  padding: ${({ theme }) => theme.space['2']};
  width: ${({ size }) => SIZES_WIDTH[size]}px;
  max-width: ${({ size }) => SIZES_WIDTH[size]}px;
  text-align: initial;

  ${({ theme, sentiment }) => {
    if (sentiment === 'neutral') {
      return `
      background: ${theme.colors.neutral.background};
      box-shadow: ${theme.shadows.popover};
      &[data-has-arrow='true'] {
        &::after {
          border-color: ${theme.colors.neutral.background} transparent transparent transparent;
        }
      }
      `
    }

    return `
      background: ${theme.colors.primary.backgroundStrong};
      box-shadow: ${theme.shadows.popover};
      &[data-has-arrow='true'] {
        &::after {
          border-color: ${theme.colors.primary.backgroundStrong} transparent transparent transparent;
        }
      }
      `
  }}
`

type ContentWrapperProps = Pick<
  PopoverProps,
  'title' | 'onClose' | 'sentiment' | 'children'
>

const ContentWrapper = ({
  title,
  onClose,
  children,
  sentiment,
}: ContentWrapperProps) => (
  <Stack gap={1}>
    <Stack direction="row" justifyContent="space-between">
      <Text
        variant="bodyStrong"
        as="h3"
        prominence={sentiment === 'neutral' ? 'strong' : 'stronger'}
      >
        {title}
      </Text>
      <Button
        variant={sentiment === 'neutral' ? 'ghost' : 'filled'}
        sentiment={sentiment === 'neutral' ? 'neutral' : 'primary'}
        onClick={onClose}
        size="small"
        icon="close"
        aria-label="close"
      />
    </Stack>
    {typeof children === 'string' ? (
      <Text
        variant="bodySmall"
        as="p"
        prominence={sentiment === 'neutral' ? 'strong' : 'stronger'}
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
  sentiment?: SentimentType
  visible?: boolean
  size?: keyof typeof SIZES_WIDTH
  onClose: () => void
  className?: string
  'data-testid'?: string
} & Pick<ComponentProps<typeof Popup>, 'placement'>

/**
 * Popover component is used to display additional information or actions on top of the main content of the page.
 * It is usually triggered by clicking on a button. It includes a title, a close button and a content area.
 */
export const Popover = ({
  visible = false,
  children,
  placement,
  content,
  title,
  sentiment = 'neutral',
  size = 'medium',
  onClose,
  className,
  'data-testid': dataTestId,
}: PopoverProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback(
    (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [handleClickOutside])

  return (
    <StyledPopup
      visible={visible}
      placement={placement}
      text={
        <ContentWrapper title={title} onClose={onClose} sentiment={sentiment}>
          {content}
        </ContentWrapper>
      }
      className={className}
      sentiment={sentiment}
      data-testid={dataTestId}
      size={size}
      role="dialog"
      ref={ref}
    >
      {children}
    </StyledPopup>
  )
}
