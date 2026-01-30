'use client'

import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactEventHandler,
} from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Stack } from '../../Stack'
import { useModal } from '../ModalProvider'
import {
  modal,
  modalBackdrop,
  modalContent,
  modalImage,
  modalImageContainer,
  positionModal,
  topModal,
} from '../styles.css'
import type { DialogProps } from '../types'

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
  className,
  'data-testid': dataTestId,
  preventBodyScroll,
  hideOnEsc,
  backdropClassName,
  image,
  style,
  ref,
}: DialogProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const containerRef = useRef(document.createElement('div'))
  const nonDefaultRef = useRef<HTMLDialogElement>(null)
  const dialogRef = ref ?? nonDefaultRef
  const onCloseRef = useRef(onClose)
  const {
    registerModal,
    unregisterModal,
    openedModals,
    previsousOpenedModales,
  } = useModal()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // register/unregister the modal to handle nested modals
  useEffect(() => {
    registerModal({ id, ref: dialogRef })

    return () => {
      unregisterModal(id)
    }
  }, [id, registerModal, unregisterModal, dialogRef])

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

  // On open focus the modal
  useEffect(() => {
    dialogRef.current?.focus()
  }, [dialogRef])

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
  const realPosition = [...openedModals].findIndex(object => object.id === id)
  const position = [...openedModals]
    // oxlint-disable-next-line unicorn/no-array-reverse
    .reverse()
    .findIndex(object => object.id === id) // reverse method mutate array so we need to create a new array
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

  const handleClose: MouseEventHandler = useCallback(
    event => {
      // if the user actually click outside of modal
      if (
        hideOnClickOutside &&
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node) &&
        position === 0
      ) {
        onCloseRef.current()
      }
    },
    [hideOnClickOutside, position, dialogRef],
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

      const focusableEls = dialogRef.current?.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])',
      )

      // Handle case when no interactive element are within the modal (including close icon)
      if (focusableEls?.length === 0) {
        event.preventDefault()
      }

      if (focusableEls) {
        const elems = [...focusableEls]
        const firstFocusableEl = elems[0]
        const lastFocusableEl = elems.at(-1)

        if (event.shiftKey) {
          if (
            document.activeElement === firstFocusableEl ||
            document.activeElement === dialogRef.current
          ) {
            if (lastFocusableEl instanceof HTMLElement) {
              lastFocusableEl.focus()
            }
            event.preventDefault()
          }
        } else if (
          document.activeElement === lastFocusableEl ||
          document.activeElement === dialogRef.current
        ) {
          if (firstFocusableEl instanceof HTMLElement) {
            firstFocusableEl.focus()
          }
          event.preventDefault()
        }
      }
    },
    [dialogRef],
  )

  if (
    modalAbove?.ref &&
    typeof modalAbove.ref === 'object' &&
    'current' in modalAbove.ref &&
    currentModalHeight
  ) {
    top =
      (modalAbove?.ref?.current?.offsetHeight ?? 0) / 2 -
      currentModalHeight / 2 +
      20
  }

  const animation =
    openedModals.length > 1 &&
    position === 0 &&
    previsousOpenedModales.length < openedModals.length

  return createPortal(
    <div
      className={cn(
        backdropClassName,
        modalBackdrop({ open: true, visible: isVisible }),
      )}
      data-testid={dataTestId ? `${dataTestId}-backdrop` : undefined}
      data-visible={isVisible}
      onClick={handleClose}
      onFocus={stopFocus}
      onKeyDown={() => {}}
    >
      <dialog
        aria-label={ariaLabel}
        aria-modal
        className={cn(
          className,
          modal({
            animation,
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
        open
        ref={dialogRef}
        style={{
          ...assignInlineVars({
            [topModal]: `-${top}px`,
            [positionModal]: `${position * 50}px`,
          }),
          ...style,
        }}
        // biome-ignore  lint/a11y/noNoninteractiveTabindex: to fix
        tabIndex={0}
      >
        {image ? (
          <>
            <Stack
              alignItems="flex-end"
              className={modalImageContainer}
              justifyContent="center"
            >
              <img alt="illustration" className={modalImage} src={image} />
            </Stack>
            <Stack className={modalContent} gap={5}>
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
