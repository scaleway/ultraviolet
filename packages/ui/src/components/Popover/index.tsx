import styled from '@emotion/styled'
import type { ComponentProps, KeyboardEventHandler, ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../Button'
import { Popup } from '../Popup'
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
}: ContentWrapperProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  return (
    <Stack gap={1}>
      <Stack direction="row" justifyContent="space-between">
        <Text
          variant="bodyStrong"
          as="h3"
          sentiment="neutral"
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
          ref={buttonRef}
        />
      </Stack>
      {typeof children === 'string' ? (
        <Text
          variant="bodySmall"
          as="p"
          sentiment="neutral"
          prominence={sentiment === 'neutral' ? 'strong' : 'stronger'}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Stack>
  )
}

type PopoverProps = {
  children: ReactNode
  content: ReactNode
  title: string
  sentiment?: SentimentType
  visible?: boolean
  size?: keyof typeof SIZES_WIDTH
  onClose?: () => void
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
  const innerRef = useRef<HTMLDivElement>(null)
  const [localVisible, setLocalVisible] = useState(visible)

  // We change local value if visible prop changes
  useEffect(() => {
    setLocalVisible(visible)
  }, [visible])

  // When space key is pressed we show the popover
  const onKeyDownSpace: KeyboardEventHandler = useCallback(event => {
    if (event.code === 'Space') {
      event.preventDefault()
      event.stopPropagation()
      setLocalVisible(true)
    }
  }, [])

  // When we close we hide the popover and focus the disclosure element
  const localOnClose = useCallback(() => {
    setLocalVisible(false)
    onClose?.()
    innerRef.current?.focus()
  }, [onClose])

  return (
    <StyledPopup
      hideOnClickOutside
      needDebounce={false}
      visible={localVisible}
      placement={placement}
      text={
        <ContentWrapper
          title={title}
          onClose={localOnClose}
          sentiment={sentiment}
        >
          {content}
        </ContentWrapper>
      }
      className={className}
      sentiment={sentiment}
      data-testid={dataTestId}
      size={size}
      role="dialog"
      ref={ref}
      innerRef={innerRef}
      onClose={localOnClose}
      onKeyDown={onKeyDownSpace}
    >
      {children}
    </StyledPopup>
  )
}
