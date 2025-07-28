'use client'

import styled from '@emotion/styled'
import { CloseIcon } from '@ultraviolet/icons'
import type { ComponentProps } from 'react'
import { Button } from '../Button'
import type { Modal } from '.'
import { Dialog } from './components/Dialog'
import type { ModalPlacement, ModalSize } from './types'

const StyledContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space['2']};
  right: ${({ theme }) => theme.space['2']};
`

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
}: ModalContentProps) =>
  visible || open ? (
    <Dialog
      open={visible || open}
      placement={placement}
      size={finalSize}
      ariaLabel={ariaLabel}
      hideOnClickOutside={hideOnClickOutside}
      hideOnEsc={hideOnEsc}
      preventBodyScroll={preventBodyScroll}
      onClose={handleClose}
      className={className}
      backdropClassName={backdropClassName}
      data-testid={dataTestId}
      id={finalId}
      image={image}
    >
      <>
        {typeof children === 'function'
          ? children({
              visible,
              toggle: handleToggle,
              modalId: finalId,
              close: handleClose,
              show: handleOpen,
            })
          : children}
        <StyledContainer>
          {isClosable ? (
            <Button
              data-testid={
                dataTestId ? `${dataTestId}-close-button` : undefined
              }
              onClick={handleClose}
              variant="ghost"
              size="small"
              sentiment="neutral"
              aria-label="close"
            >
              <CloseIcon />
            </Button>
          ) : null}
        </StyledContainer>
      </>
    </Dialog>
  ) : null
