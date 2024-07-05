import styled from '@emotion/styled'
import type {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactEventHandler,
} from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { MODAL_PLACEMENT, MODAL_WIDTH } from './constants'
import type { DialogProps, ModalPlacement, ModalSize } from './types'

const StyledBackdrop = styled.div<{ 'data-open': boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 0;
  width: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.overlay};
  z-index: 1;

  &[data-open='true'] {
    padding: ${({ theme }) => theme.space['2']};
    overflow: auto;
    display: flex;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`

type StyledDialogProps = {
  'data-size': ModalSize
  'data-placement': ModalPlacement
}

export const StyledDialog = styled.dialog<StyledDialogProps>`
  background-color: ${({ theme }) =>
    theme.colors.neutral.backgroundWeakElevated};
  position: relative;
  border-radius: ${({ theme }) => theme.radii.default};
  border: 0;
  padding: ${({ theme }) => theme.space['3']};
  width: ${MODAL_WIDTH.medium}px;
  box-shadow: ${({ theme }) => theme.shadows.modal};

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
`

export const Dialog = ({
  children,
  open,
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
  const containerRef = useRef(document.createElement('div'))
  const dialogRef = useRef<HTMLDialogElement>(null)
  const onCloseRef = useRef(onClose)

  // Portal to put the modal in
  useEffect(() => {
    const element = containerRef.current
    if (open) {
      document.body.appendChild(element)
    }

    return () => {
      if (document.body.contains(element)) {
        document.body.removeChild(element)
      }
    }
  }, [open])

  // Save the reassignment of eventHandler in the useEffect below
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // On open focus the modal
  useEffect(() => {
    if (open) {
      dialogRef.current?.focus()
    }
  }, [open])

  // Handle body scroll
  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (open && preventBodyScroll) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [preventBodyScroll, open])

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

  return open
    ? createPortal(
        <StyledBackdrop
          data-open={open}
          onClick={handleClose}
          className={backdropClassName}
          css={backdropCss}
          data-testid={dataTestId ? `${dataTestId}-backdrop` : undefined}
          onFocus={stopFocus}
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
            open={open}
            onClick={stopClick}
            onCancel={stopCancel}
            onClose={stopCancel}
            aria-modal
            ref={dialogRef}
            tabIndex={0}
          >
            {open ? children : null}
          </StyledDialog>
        </StyledBackdrop>,
        containerRef.current,
      )
    : null
}
