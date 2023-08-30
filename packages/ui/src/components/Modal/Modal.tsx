import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import type React from 'react'
import { useCallback, useId, useState } from 'react'
import { Button } from '../Button'
import { Dialog } from './Dialog'
import { Disclosure } from './Disclosure'
import type { ModalPlacement, ModalSize, ModalState } from './types'

export type ModalProps = {
  id?: string
  hideOnEsc?: boolean
  hideOnClickOutside?: boolean
  preventBodyScroll?: boolean
  ariaLabel?: string
  disclosure?: ReactNode | ((state: ModalState) => ReactNode)
  isClosable?: boolean
  onClose?: () => void
  onBeforeClose?: () => Promise<void> | void
  opened?: boolean
  placement?: ModalPlacement
  size?: ModalSize
  /**
   * @deprecated You should use size prop instead
   */
  width?: ModalSize
  children: ReactNode | ((args: ModalState) => ReactNode)
  className?: string
  'data-testid'?: string
  backdropClassName?: string
  /**
   * @deprecated You should use backdropClassName instead
   */
  customDialogBackdropStyles?: React.JSX.IntrinsicAttributes['css']
  /**
   * @deprecated You should use className instead
   */
  customDialogStyles?: React.JSX.IntrinsicAttributes['css']
}

const StyledContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space['2']};
  right: ${({ theme }) => theme.space['2']};
`

export const Modal = ({
  ariaLabel = 'modal',
  id,
  children,
  disclosure,
  hideOnClickOutside = true,
  hideOnEsc = true,
  isClosable = true,
  onClose,
  onBeforeClose,
  opened = false,
  placement = 'center',
  preventBodyScroll = true,
  size = 'small',
  className,
  'data-testid': dataTestId,
  backdropClassName,
  width,
  customDialogStyles,
  customDialogBackdropStyles,
}: ModalProps) => {
  const [visible, setVisible] = useState(opened)
  const controlId = useId()

  const handleOpen = useCallback(() => {
    setVisible(true)
  }, [])

  const handleClose = useCallback(async () => {
    if (onClose) {
      onClose()
    } else {
      await onBeforeClose?.()
      setVisible(false)
    }
  }, [onBeforeClose, onClose])

  const handleToggle = useCallback(() => {
    setVisible(current => !current)
  }, [])

  const finalId = id ?? controlId
  const finalSize = size ?? width

  return (
    <>
      {disclosure ? (
        <Disclosure
          id={finalId}
          handleOpen={handleOpen}
          disclosure={disclosure}
          handleClose={handleClose}
          visible={visible}
          toggle={handleToggle}
        />
      ) : null}
      <Dialog
        open={visible}
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
      >
        <>
          {visible &&
            (typeof children === 'function'
              ? children({
                  visible,
                  onClose: handleClose,
                  onOpen: handleOpen,
                  toggle: handleToggle,
                  modalId: finalId,
                })
              : children)}
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
    </>
  )
}
