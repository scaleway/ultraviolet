'use client'

import { CloseIcon } from '@ultraviolet/icons'
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
import type { SIZES_WIDTH } from './constant'
import { popover, stackPopover } from './styles.css'

type SentimentType = 'neutral' | 'primary'

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
  <Stack className={stackPopover} gap={1}>
    <Stack direction="row" justifyContent="space-between">
      <Text
        as="h3"
        prominence={sentiment === 'neutral' ? 'strong' : 'stronger'}
        sentiment={sentiment === 'neutral' ? 'neutral' : 'white'}
        variant="bodyStrong"
      >
        {title}
      </Text>
      <Button
        aria-label="close"
        onClick={onClose}
        sentiment={sentiment === 'neutral' ? 'neutral' : 'primary'}
        size="small"
        variant={sentiment === 'neutral' ? 'ghost' : 'filled'}
      >
        <CloseIcon />
      </Button>
    </Stack>
    {typeof children === 'string' ? (
      <Text
        as="p"
        prominence={sentiment === 'neutral' ? 'strong' : 'stronger'}
        sentiment={sentiment === 'neutral' ? 'neutral' : 'white'}
        variant="bodySmall"
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
  placement?: Exclude<ComponentProps<typeof Popup>['placement'], 'nested-menu'>
} & Pick<
  ComponentProps<typeof Popup>,
  'dynamicDomRendering' | 'align' | 'style'
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
      style,
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
      <Popup
        align={align}
        className={`${className ? `${className} ` : ''}${popover({ sentiment, size })}`}
        data-testid={dataTestId}
        debounceDelay={0}
        dynamicDomRendering={dynamicDomRendering}
        hideOnClickOutside
        innerRef={innerRef}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        onClose={localOnClose}
        placement={placement}
        portalTarget={smartPortalTarget}
        ref={ref}
        role="dialog"
        style={style}
        tabIndex={-1}
        text={
          <ContentWrapper
            onClose={localOnClose}
            sentiment={sentiment}
            title={title}
          >
            {content}
          </ContentWrapper>
        }
        visible={localVisible}
      >
        {children}
      </Popup>
    )
  },
)
