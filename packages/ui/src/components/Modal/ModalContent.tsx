'use client'

import { CloseIcon } from '@ultraviolet/icons'
import type { ComponentProps, CSSProperties } from 'react'
import { Button } from '../Button'
import type { Modal } from '.'
import { Dialog } from './components/Dialog'
import { modalContainer } from './styles.css'
import type { ModalPlacement, ModalSize } from './types'

type ModalContentProps = ComponentProps<typeof Modal> & {
  visible: boolean
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
  visible,
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
  style,
}: ModalContentProps) =>
  visible || open ? (
    <Dialog
      ariaLabel={ariaLabel}
      backdropClassName={backdropClassName}
      className={className}
      data-testid={dataTestId}
      hideOnClickOutside={hideOnClickOutside}
      hideOnEsc={hideOnEsc}
      id={finalId}
      image={image}
      onClose={handleClose}
      open={visible || open}
      placement={placement}
      preventBodyScroll={preventBodyScroll}
      size={finalSize}
      style={style}
    >
      <>
        {typeof children === 'function'
          ? children({
              close: handleClose,
              modalId: finalId,
              show: handleOpen,
              toggle: handleToggle,
              visible,
            })
          : children}
        <div className={modalContainer}>
          {isClosable ? (
            <Button
              aria-label="close"
              data-testid={
                dataTestId ? `${dataTestId}-close-button` : undefined
              }
              onClick={handleClose}
              sentiment="neutral"
              size="small"
              variant="ghost"
            >
              <CloseIcon />
            </Button>
          ) : null}
        </div>
      </>
    </Dialog>
  ) : null
