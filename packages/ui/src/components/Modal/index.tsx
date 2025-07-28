'use client'

import type { ReactElement, ReactNode } from 'react'
import { useCallback, useContext, useId, useRef, useState } from 'react'
import { ModalContent } from './ModalContent'
import { ModalContext, ModalProvider } from './ModalProvider'
import { Disclosure } from './components/Disclosure'
import type { ModalPlacement, ModalSize, ModalState } from './types'

export type ModalProps = {
  id?: string
  hideOnEsc?: boolean
  hideOnClickOutside?: boolean
  preventBodyScroll?: boolean
  ariaLabel?: string
  disclosure?: ReactElement | ((state: ModalState) => ReactElement)
  isClosable?: boolean
  onClose?: () => void
  onBeforeClose?: () => Promise<void> | void
  open?: boolean
  placement?: ModalPlacement
  size?: ModalSize
  children: ReactNode | ((args: ModalState) => ReactNode)
  className?: string
  'data-testid'?: string
  backdropClassName?: string
  /**
   * Add an image a the top of the modal.
   */
  image?: string
}
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
  open = false,
  placement = 'center',
  preventBodyScroll = true,
  size = 'small',
  className,
  'data-testid': dataTestId,
  backdropClassName,
  image,
}: ModalProps) => {
  // Used for disclosure usage only
  const [visible, setVisible] = useState(false)
  const controlId = useId()
  const disclosureRef = useRef<HTMLDivElement>(null)
  const handleOpen = useCallback(() => {
    setVisible(true)
  }, [])

  const handleClose = useCallback(() => {
    disclosureRef.current?.focus()

    if (onClose) {
      onClose()
    } else {
      const promise = onBeforeClose?.()
      if (promise && 'catch' in promise) {
        promise.catch(() => null)
      }
      setVisible(false)
    }
  }, [onBeforeClose, onClose])

  const handleToggle = useCallback(() => {
    disclosureRef.current?.focus()
    setVisible(current => !current)
  }, [])

  const finalId = id ?? controlId

  // using context we can check if the modal is being used inside another modal
  // the first modal to render will create the context, and the others will use it.
  const context = useContext(ModalContext)

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
          ref={disclosureRef}
        />
      ) : null}
      {!context ? (
        <ModalProvider>
          <ModalContent
            open={open}
            visible={visible}
            placement={placement}
            finalSize={size}
            ariaLabel={ariaLabel}
            hideOnClickOutside={hideOnClickOutside}
            hideOnEsc={hideOnEsc}
            preventBodyScroll={preventBodyScroll}
            handleClose={handleClose}
            className={className}
            backdropClassName={backdropClassName}
            dataTestId={dataTestId}
            isClosable={isClosable}
            handleOpen={handleOpen}
            handleToggle={handleToggle}
            finalId={finalId}
            image={image}
          >
            {children}
          </ModalContent>
        </ModalProvider>
      ) : (
        <ModalContent
          open={open}
          visible={visible}
          placement={placement}
          finalSize={size}
          ariaLabel={ariaLabel}
          hideOnClickOutside={hideOnClickOutside}
          hideOnEsc={hideOnEsc}
          preventBodyScroll={preventBodyScroll}
          handleClose={handleClose}
          className={className}
          backdropClassName={backdropClassName}
          dataTestId={dataTestId}
          isClosable={isClosable}
          handleOpen={handleOpen}
          handleToggle={handleToggle}
          finalId={finalId}
          image={image}
        >
          {children}
        </ModalContent>
      )}
    </>
  )
}
