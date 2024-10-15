import styled from '@emotion/styled'
import type {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactEventHandler,
} from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { slideFromBottom } from '../../../utils/animations'
import { useModal } from '../ModalProvider'
import { MODAL_PLACEMENT, MODAL_WIDTH } from '../constants'
import type { DialogProps, ModalPlacement, ModalSize } from '../types'

const StyledBackdrop = styled.div<{ 'data-open': boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 0;
  width: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.overlay};
  z-index: 1;
  opacity: 0;

  &[data-open='true'] {
    padding: ${({ theme }) => theme.space['2']};
    overflow: auto;
    display: flex;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  &[data-visible='true'] {
    opacity: 1;
  }

  &[data-animation='true'] {
    overflow: hidden;
  }
`

type StyledDialogProps = {
  'data-size': ModalSize
  'data-placement': ModalPlacement
  position: number
  size: ModalSize
  top?: number
}

export const StyledDialog = styled('dialog', {
  shouldForwardProp: prop =>
    !['position', 'size', 'openedModals', 'top'].includes(prop),
})<StyledDialogProps>`
  background-color: ${({ theme }) =>
    theme.colors.other.elevation.background.overlay};
  position: relative;
  border-radius: ${({ theme }) => theme.radii.default};
  border: 0;
  padding: ${({ theme }) => theme.space['3']};
  width: ${MODAL_WIDTH.medium}px;
  box-shadow: ${({ theme }) => `${theme.shadows.overlay[0]}, ${theme.shadows.overlay[1]}`};


  ${Object.entries(MODAL_WIDTH).map(
    ([size, value]) => `
      &[data-size="${size}"] {
        width: ${value}px;
      }
      `,
  )}

  ${Object.entries(MODAL_PLACEMENT).map(
    ([placement, value]) => `
        &[data-placement="${placement}"] {
          ${value}
        }
        `,
  )}

  &[data-animation='true'] {
    animation: ${slideFromBottom} 0.3s ease-in-out forwards;
  }

  transition: width 0.3s ease-in-out, transform 0.3s ease-in-out;

  ${({ position, size, top }) =>
    position > 0
      ? `
    width: ${MODAL_WIDTH[size] - position * 50}px !important;
    transform: translate3d(0, -${top}px, 0);
  `
      : undefined}
`

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
  dialogCss,
  backdropCss,
}: DialogProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const containerRef = useRef(document.createElement('div'))
  const dialogRef = useRef<HTMLDialogElement>(null)
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
  }, [id, registerModal, unregisterModal])

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
  }, [])

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

  // Stop click to prevent unexpected dialog close
  const stopClick: MouseEventHandler = useCallback(event => {
    event.stopPropagation()
  }, [])

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
      event.stopPropagation()
      if (hideOnClickOutside) {
        onCloseRef.current()
      } else {
        // Because overlay is not focusable we can't handle hideOnEsc properly
        dialogRef.current?.focus()
      }
    },
    [hideOnClickOutside],
  )

  // Enable focus trap inside the modal
  const handleFocusTrap: KeyboardEventHandler = useCallback(event => {
    event.stopPropagation()
    if (event.key === 'Escape') {
      event.preventDefault()

      return
    }
    const isTabPressed = event.key === 'Tab'

    if (!isTabPressed) {
      return
    }

    const focusableEls =
      dialogRef.current?.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])',
      ) ?? []

    // Handle case when no interactive element are within the modal (including close icon)
    if (focusableEls.length === 0) {
      event.preventDefault()
    }

    const firstFocusableEl = focusableEls[0] as HTMLElement
    const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement

    if (event.shiftKey) {
      if (
        document.activeElement === firstFocusableEl ||
        document.activeElement === dialogRef.current
      ) {
        lastFocusableEl.focus()
        event.preventDefault()
      }
    } else if (
      document.activeElement === lastFocusableEl ||
      document.activeElement === dialogRef.current
    ) {
      firstFocusableEl.focus()
      event.preventDefault()
    }
  }, [])

  // Prevent default behaviour on Escape
  const stopCancel: ReactEventHandler = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  // We need to reverse the array as the last opened modal should be the first to be with normal size
  // while the first opened modal should shrink
  const realPosition = [...openedModals].findIndex(object => object.id === id)
  const position = [...openedModals]
    .reverse()
    .findIndex(object => object.id === id) // reverse method mutate array so we need to create a new array
  const modalAbove = openedModals[realPosition + 1]
  const currentModalHeight = dialogRef.current?.offsetHeight
  let top = 0

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
    <StyledBackdrop
      data-open
      onClick={handleClose}
      className={backdropClassName}
      css={backdropCss}
      data-testid={dataTestId ? `${dataTestId}-backdrop` : undefined}
      onFocus={stopFocus}
      data-animation={animation}
      data-visible={isVisible}
      id="backdrop-modal"
    >
      <StyledDialog
        css={dialogCss}
        onKeyUp={handleKeyUp}
        onKeyDown={handleFocusTrap}
        className={className}
        id={id}
        data-testid={dataTestId}
        aria-label={ariaLabel}
        data-placement={placement}
        data-size={size}
        open
        onClick={stopClick}
        onCancel={stopCancel}
        onClose={stopCancel}
        onMouseDown={stopClick}
        aria-modal
        ref={dialogRef}
        tabIndex={0}
        position={position}
        top={top > 0 ? top : 0}
        data-animation={animation}
        size={size}
      >
        {children}
      </StyledDialog>
    </StyledBackdrop>,
    containerRef.current,
  )
}
