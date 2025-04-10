import styled from '@emotion/styled'
import type { ComponentProps } from 'react'
import type { Modal } from '.'
import { Button } from '../Button'
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
  opened: boolean
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
  opened,
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
  customDialogStyles,
  customDialogBackdropStyles,
  isClosable,
  children,
  handleOpen,
  handleToggle,
  finalId,
  image,
}: ModalContentProps) =>
  visible || open || opened ? (
    <Dialog
      open={visible || open || opened}
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
      dialogCss={customDialogStyles}
      backdropCss={customDialogBackdropStyles}
      image={image}
    >
      <>
        {typeof children === 'function'
          ? children({
              visible,
              onClose: handleClose,
              onOpen: handleOpen,
              toggle: handleToggle,
              modalId: finalId,
              hide: handleClose,
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
              icon="close"
              sentiment="neutral"
              aria-label="close"
            />
          ) : null}
        </StyledContainer>
      </>
    </Dialog>
  ) : null
