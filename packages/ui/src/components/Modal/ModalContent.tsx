'use client'

import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { useEffect, useState } from 'react'
import type { ComponentProps, CSSProperties } from 'react'
import type { Modal } from '.'
import { Button } from '../Button'
import { Dialog } from './components/Dialog'
import type { ModalPlacement, ModalSize } from './types'
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
  const shouldRender = useDelayUnmount(open, ANIMATION_DURATION_MS)

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
            aria-label="close"
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

function useDelayUnmount(open?: boolean, delayTime?: number) {
  const [shouldRender, setShouldRender] = useState(open)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    if (open && !shouldRender) {
      setShouldRender(true)
    } else if (!open && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime)
    }
    return () => clearTimeout(timeoutId)
  }, [open, delayTime, shouldRender])

  return shouldRender
}
