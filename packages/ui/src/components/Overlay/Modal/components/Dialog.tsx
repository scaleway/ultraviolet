'use client'

import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useCallback, useEffect, useRef } from 'react'
import type {
  FocusEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  PointerEventHandler,
  ReactEventHandler,
} from 'react'
import { createPortal } from 'react-dom'
import { Stack } from '../../../Layout/Stack'
import { FOCUSABLE_ELEMENTS } from '../../constants'
import { useModal } from '../ModalProvider'
import type { DialogProps } from '../types'
import { modalStyle, nestedModalScale, nestedModalTop } from '../styles.css'

// Prevent default behaviour on Escape
const stopCancel: ReactEventHandler = event => {
  event.preventDefault()
  event.stopPropagation()
}

export const Dialog = ({
  children,
  placement,
  onClose,
  hideOnClickOutside,
  size,
  id,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  className,
  'data-testid': dataTestId,
  preventBodyScroll,
  hideOnEsc,
  backdropClassName,
  backdropStyle,
  image,
  imageAlt = '',
  style,
  ref,
  isDrawer,
  open,
}: DialogProps) => {
  const containerRef = useRef(document.createElement('div'))
  const nonDefaultRef = useRef<HTMLDialogElement>(null)
  const dialogRef = ref ?? nonDefaultRef
  const onCloseRef = useRef(onClose)
  const { registerModal, unregisterModal, openedModals } = useModal()

  // register/unregister the modal to handle nested modals
  useEffect(() => {
    if (isDrawer) {
      // a drawer should not be registered since it does not stack with other modals
      return
    }
    if (open) {
      registerModal({ id, ref: dialogRef })
    } else {
      unregisterModal(id)
    }

    return () => {
      unregisterModal(id)
    }
  }, [id, open, registerModal, unregisterModal, dialogRef, isDrawer])

  // Portal to put the modal in
  useEffect(() => {
    const element = containerRef.current
    document.body.appendChild(element)

    return () => {
      if (document.body.contains(element)) {
        document.body.removeChild(element)
      }
    }
  }, [])

  // Save the reassignment of eventHandler in the useEffect below
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // On open focus the first focusable element inside the modal; on close restore focus.
  // Restoring is done in the effect body rather than in a cleanup function otherwise React StrictMode's
  // unmount/remount cycle would bounce the focus out of a Select that opens a Modal and close it immediately.
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (open) {
      previouslyFocusedElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      const firstFocusableElement = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_ELEMENTS)
      const elementToFocus = firstFocusableElement ?? dialogRef.current
      elementToFocus?.focus({ preventScroll: true }) // preventScroll to avoid breaking the Drawer opening animation
    } else if (previouslyFocusedElement.current?.isConnected) {
      previouslyFocusedElement.current.focus()
    }
  }, [open, dialogRef])

  // Handle body scroll
  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (preventBodyScroll) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [preventBodyScroll])

  // Stop focus to prevent unexpected body loose focus
  const stopFocus: FocusEventHandler = useCallback(event => {
    event.stopPropagation()
  }, [])

  // We need to reverse the array as the last opened modal should be the first to be with normal size
  // while the first opened modal should shrink
  const realPosition = openedModals.findIndex(object => object.id === id)
  const position = openedModals.toReversed().findIndex(object => object.id === id)
  const modalAbove = openedModals[realPosition + 1]
  const currentModalHeight = dialogRef.current?.offsetHeight
  let top = 0

  // handle key up : used when having inputs in modals - useful for hideOnEsc
  const handleKeyUp: KeyboardEventHandler = useCallback(
    event => {
      event.stopPropagation()
      if (event.key === 'Escape' && hideOnEsc) {
        event.preventDefault()
        onCloseRef.current()
      }
    },
    [hideOnEsc],
  )

  const pointerDownTargetRef = useRef<HTMLElement>(null)

  const handlePointerDown: PointerEventHandler = useCallback(event => {
    pointerDownTargetRef.current = event.target as HTMLElement
  }, [])

  const handleClose: PointerEventHandler = useCallback(
    event => {
      const clickedOutside =
        dialogRef.current &&
        !dialogRef.current.contains(pointerDownTargetRef.current) &&
        !dialogRef.current.contains(event.target as HTMLElement)

      if (hideOnClickOutside && clickedOutside && (isDrawer || position === 0)) {
        onCloseRef.current()
      }
    },
    [hideOnClickOutside, position, dialogRef, isDrawer],
  )

  const handleFocusMove = useCallback(
    (event: KeyboardEvent, firstFocusableEl: Element, lastFocusableEl?: Element) => {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableEl || document.activeElement === dialogRef.current) {
          if (lastFocusableEl instanceof HTMLElement) {
            lastFocusableEl.focus()
          }
          event.preventDefault()
        }
      } else if (document.activeElement === lastFocusableEl || document.activeElement === dialogRef.current) {
        if (firstFocusableEl instanceof HTMLElement) {
          firstFocusableEl.focus()
        }
        event.preventDefault()
      }
    },
    [dialogRef],
  )

  // Enable focus trap inside the modal
  const handleFocusTrap: KeyboardEventHandler = useCallback(
    event => {
      event.stopPropagation()
      if (event.key === 'Escape') {
        event.preventDefault()

        return
      }
      const isTabPressed = event.key === 'Tab'

      if (!isTabPressed) {
        return
      }

      const focusableEls = dialogRef.current?.querySelectorAll(FOCUSABLE_ELEMENTS)

      // Handle case when no interactive element are within the modal (including close icon)
      if (focusableEls?.length === 0) {
        event.preventDefault()
      }

      if (focusableEls) {
        const elems = [...focusableEls]
        const firstFocusableEl = elems[0]
        const lastFocusableEl = elems.at(-1)
        handleFocusMove(event, firstFocusableEl, lastFocusableEl)
      }
    },
    [dialogRef, handleFocusMove],
  )

  if (modalAbove?.ref && typeof modalAbove.ref === 'object' && 'current' in modalAbove.ref && currentModalHeight) {
    top = (modalAbove?.ref?.current?.offsetHeight ?? 0) / 2 - currentModalHeight / 2 + 20
  }

  return createPortal(
    <div
      className={cn(backdropClassName, modalStyle.backdrop)}
      style={backdropStyle}
      data-testid={dataTestId ? `${dataTestId}-backdrop` : undefined}
      onPointerDown={handlePointerDown}
      onPointerUp={handleClose}
      onFocus={stopFocus}
    >
      <dialog
        aria-label={ariaLabelledBy ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-modal
        className={cn(
          className,
          modalStyle.modal({
            image: !!image,
            placement,
            positivePosition: position > 0,
            size,
          }),
        )}
        data-size={size}
        data-testid={dataTestId}
        id={id}
        onCancel={stopCancel}
        onClose={stopCancel}
        onKeyDown={handleFocusTrap}
        onKeyUp={handleKeyUp}
        open={open}
        ref={dialogRef}
        style={{
          ...assignInlineVars({
            [nestedModalTop]: `-${top}px`,
            [nestedModalScale]: String(1 - position * 0.1),
          }),
          ...style,
        }}
        tabIndex={0}
      >
        {image ? (
          <>
            <Stack alignItems="flex-end" className={modalStyle.imageContainer} justifyContent="center">
              <img alt={imageAlt} className={modalStyle.image} height="auto" src={image} width="auto" />
            </Stack>
            <Stack className={modalStyle.content} gap={5}>
              {children}
            </Stack>
          </>
        ) : (
          children
        )}
      </dialog>
    </div>,
    containerRef.current,
  )
}
