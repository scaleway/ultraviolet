import styled from '@emotion/styled'
import type { KeyboardEventHandler, MouseEventHandler } from 'react'
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

  &[data-open='true'] {
    overflow: auto;
    padding: ${({ theme }) => theme.space['2']};
    display: flex;
    background-color: ${({ theme }) => theme.colors.overlay};
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 1;
  }
`

type StyledDialogProps = {
  'data-size': ModalSize
  'data-placement': ModalPlacement
}

const StyledDialog = styled.dialog<StyledDialogProps>`
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
}: DialogProps) => {
  const containerRef = useRef(document.createElement('div'))
  const onCloseRef = useRef(onClose)

  // Portal to put the modal in
  useEffect(() => {
    const element = containerRef.current
    document.body.appendChild(element)

    return () => {
      document.body.removeChild(element)
    }
  }, [])

  // Save the reassignment of eventHandler in the useEffect below
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // Handle hide on esc press
  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && hideOnEsc) {
        onCloseRef.current()
      }
    }
    if (open) {
      document.addEventListener('keyup', handleEscPress)
    }

    return () => {
      document.removeEventListener('keyup', handleEscPress)
    }
  }, [open, onCloseRef, hideOnEsc])

  // Handle body scroll
  useEffect(() => {
    if (open && preventBodyScroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [preventBodyScroll, open])

  // Stop click to prevent unexpected dialog close
  const stopClick: MouseEventHandler = useCallback(event => {
    event.stopPropagation()
  }, [])

  // Stop key up : used when having inputs in modals
  const stopKeyUp: KeyboardEventHandler = useCallback(event => {
    event.stopPropagation()
  }, [])

  return createPortal(
    <StyledBackdrop
      data-open={open}
      onClick={hideOnClickOutside ? onClose : undefined}
      className={backdropClassName}
    >
      <StyledDialog
        onKeyUp={stopKeyUp}
        className={className}
        id={id}
        data-testid={dataTestId}
        aria-label={ariaLabel}
        data-placement={placement}
        data-size={size}
        open={open}
        onClick={stopClick}
      >
        {open ? children : null}
      </StyledDialog>
    </StyledBackdrop>,
    containerRef.current,
  )
}
