'use client'

import { usePrefersReducedMotion } from '@ultraviolet/animations'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import type { ComponentProps, CSSProperties } from 'react'
import type { Modal } from '.'
import { Button } from '../Button'
import { Dialog } from './components/Dialog'
import type { ModalPlacement, ModalSize } from './types'
import { useDelayUnmount } from './useDelayUnmount'
import { ANIMATION_DURATION_MS } from './constants.css'
import { modalStyle } from './styles.css'

type ModalContentProps = ComponentProps<typeof Modal> & {
  open: boolean
  placement: ModalPlacement
  finalSize: ModalSize
  finalId: string
  handleOpen: () => void
  handleToggle: () => void
  handleClose: () => void
  dataTestId?: string
  image?: string
  style?: CSSProperties
}

export const ModalContent = ({
  open,
  placement,
  finalSize,
  ariaLabel,
  hideOnClickOutside,
  hideOnEsc,
  preventBodyScroll,
  handleClose,
  className,
  backdropClassName,
  dataTestId,
  isClosable,
  children,
  handleOpen,
  handleToggle,
  finalId,
  image,
  closeButtonSentiment,
  style,
  ref,
  isDrawer,
}: ModalContentProps) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldRender = useDelayUnmount(open, prefersReducedMotion ? 0 : ANIMATION_DURATION_MS)

  if (!shouldRender) {
    return null
  }

  return (
    <Dialog
      ariaLabel={ariaLabel}
      backdropClassName={backdropClassName}
      className={className}
      data-testid={dataTestId}
      hideOnClickOutside={hideOnClickOutside}
      hideOnEsc={hideOnEsc}
      id={finalId}
      image={image}
      isDrawer={isDrawer}
      onClose={handleClose}
      open={open}
      placement={placement}
      preventBodyScroll={preventBodyScroll}
      ref={ref}
      size={finalSize}
      style={style}
    >
      {typeof children === 'function'
        ? children({
            close: handleClose,
            modalId: finalId,
            show: handleOpen,
            toggle: handleToggle,
            visible: open,
          })
        : children}
      <div className={modalStyle.container}>
        {isClosable ? (
          <Button
            accessibleLabel="close"
            data-testid={dataTestId ? `${dataTestId}-close-button` : undefined}
            onClick={handleClose}
            sentiment={closeButtonSentiment}
            size="small"
            variant="ghost"
          >
            <CloseIcon />
          </Button>
        ) : null}
      </div>
    </Dialog>
  )
}
