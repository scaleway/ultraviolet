'use client'

import styled from '@emotion/styled'
import type { ComponentProps, ReactNode, Ref } from 'react'
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Button } from '../Button'
import { ModalContext } from '../Modal/ModalProvider'
import { Popup } from '../Popup'
import { Stack } from '../Stack'
import { Text } from '../Text'

type SentimentType = 'neutral' | 'primary'

const SIZES_WIDTH = {
  small: 20, // in rem
  medium: 26.25,
  large: 32.5,
}

const StyledPopup = styled(Popup, {
  shouldForwardProp: prop => !['sentiment', 'size'].includes(prop),
})<{
  sentiment: SentimentType
  size: keyof typeof SIZES_WIDTH
}>`
  padding: ${({ theme }) => theme.space['2']};
  width: ${({ size }) => SIZES_WIDTH[size]}rem;
  max-width: ${({ size }) => SIZES_WIDTH[size]}rem;
  text-align: initial;
  box-shadow: ${({ theme }) => theme.shadows.popover};
  background: ${({ theme, sentiment }) => (sentiment === 'neutral' ? theme.colors.neutral.background : theme.colors.primary.backgroundStrong)};

  // Overrides the default popup arrow color to match the background color
  &[data-has-arrow="true"] {
    &::after {
      border-color: ${({ theme, sentiment }) => (sentiment === 'neutral' ? theme.colors.neutral.background : theme.colors.primary.backgroundStrong)} transparent transparent transparent; 
    }
  }
`

// This is to avoid having text inherit color from popup (which is white on white background)
const StyledStack = styled(Stack)`
  color: ${({ theme }) => theme.colors.neutral.text};
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
  <StyledStack gap={1}>
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
  </StyledStack>
)

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
  maxWidth?: string
  maxHeight?: string
  /**
   * By default, the portal target is children container or document.body if children is a function. You can override this
   * behavior by setting a portalTarget prop.
   */
  portalTarget?: HTMLElement
} & Pick<
  ComponentProps<typeof Popup>,
  'placement' | 'dynamicDomRendering' | 'align'
>

/**
 * Popover component is used to display additional information or actions on top of the main content of the page.
 * It is usually triggered by clicking on a button. It includes a title, a close button and a content area.
 */
export const Popover = forwardRef(
  (
    {
      visible = false,
      children,
      placement,
      content,
      title,
      sentiment = 'neutral',
      size = 'medium',
      onClose,
      className,
      maxWidth,
      maxHeight,
      'data-testid': dataTestId,
      portalTarget,
      dynamicDomRendering,
      align,
    }: PopoverProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null)
    const isInsideModal = useContext(ModalContext)
    const [localVisible, setLocalVisible] = useState(visible)

    // We change local value if visible prop changes
    useEffect(() => {
      setLocalVisible(visible)
    }, [visible])

    const localOnClose = useCallback(() => {
      setLocalVisible(false)
      onClose?.()
    }, [onClose])

    const smartPortalTarget = useMemo(() => {
      if (!portalTarget && isInsideModal) {
        return undefined
      }

      if (!portalTarget && !isInsideModal) {
        return document.body
      }

      return portalTarget
    }, [isInsideModal, portalTarget])

    return (
      <StyledPopup
        hideOnClickOutside
        debounceDelay={0}
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
        tabIndex={-1}
        innerRef={innerRef}
        onClose={localOnClose}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        portalTarget={smartPortalTarget}
        dynamicDomRendering={dynamicDomRendering}
        align={align}
      >
        {children}
      </StyledPopup>
    )
  },
)
