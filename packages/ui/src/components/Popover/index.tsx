'use client'

import { cn } from '@ultraviolet/utils'
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { ModalContext } from '../Modal/ModalProvider'
import { Popup } from '../Popup'

import { ContentWrapper } from './ContentWrapper'
import { popoverStyle } from './styles.css'

import type { PopoverProps } from './types'
import type { Ref } from 'react'

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

      if (!(portalTarget || isInsideModal)) {
        return document.body
      }

      return portalTarget
    }, [isInsideModal, portalTarget])

    return (
      <Popup
        align={align}
        className={cn(className, popoverStyle.popover({ sentiment, size }))}
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
