import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import type React from 'react'
import { useCallback, useEffect, useId, useState } from 'react'
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

/**
 * Modal is a component that allows you to display content on top of other content.
 * It is often used to display a dialog with additional information or to ask for a confirmation.
 */
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
  size,
  className,
  'data-testid': dataTestId,
  backdropClassName,
  width = 'small',
  customDialogStyles,
  customDialogBackdropStyles,
}: ModalProps) => {
  const [visible, setVisible] = useState(opened)
  const controlId = useId()

  const handleOpen = useCallback(() => {
    setVisible(true)
  }, [])

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose()
    } else {
      const promise = onBeforeClose?.()
      if (promise && 'catch' in promise) {
        promise.catch(undefined)
      }
      setVisible(false)
    }
  }, [onBeforeClose, onClose])

  const handleToggle = useCallback(() => {
    setVisible(current => !current)
  }, [])

  const finalId = id ?? controlId
  const finalSize = size ?? width

  useEffect(() => {
    setVisible(opened)
  }, [opened])

  return (
    <>
      <Disclosure
        id={finalId}
        handleOpen={handleOpen}
        disclosure={disclosure}
        handleClose={handleClose}
        visible={visible}
        toggle={handleToggle}
      />
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
          {typeof children === 'function'
            ? children({
                visible,
                onClose: handleClose,
                onOpen: handleOpen,
                toggle: handleToggle,
                modalId: finalId,
                hide: handleClose,
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
    </>
  )
}
