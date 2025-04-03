import type { ReactElement, ReactNode } from 'react'
import type React from 'react'
import { useCallback, useContext, useId, useState } from 'react'
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
  /**
   * @deprecated You should use open prop instead
   */
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
  /**
   * Add an image a the top of the modal.
   * Do not forget to add an alternative text to the image using prop `imageAlt`
   */
  image?: string
  /**
   * Alternative text to the image defined with prop `image`. By default set to "promotional image".
   */
  imageAlt?: string
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
  image,
  imageAlt = 'promotional image',
}: ModalProps) => {
  // Used for disclosure usage only
  const [visible, setVisible] = useState(false)
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
        promise.catch(() => null)
      }
      setVisible(false)
    }
  }, [onBeforeClose, onClose])

  const handleToggle = useCallback(() => {
    setVisible(current => !current)
  }, [])

  const finalId = id ?? controlId
  const finalSize = size ?? width

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
        />
      ) : null}
      {!context ? (
        <ModalProvider>
          <ModalContent
            open={open}
            opened={opened}
            visible={visible}
            placement={placement}
            finalSize={finalSize}
            ariaLabel={ariaLabel}
            hideOnClickOutside={hideOnClickOutside}
            hideOnEsc={hideOnEsc}
            preventBodyScroll={preventBodyScroll}
            handleClose={handleClose}
            className={className}
            backdropClassName={backdropClassName}
            dataTestId={dataTestId}
            customDialogStyles={customDialogStyles}
            customDialogBackdropStyles={customDialogBackdropStyles}
            isClosable={isClosable}
            handleOpen={handleOpen}
            handleToggle={handleToggle}
            finalId={finalId}
            image={image}
            imageAlt={imageAlt}
          >
            {children}
          </ModalContent>
        </ModalProvider>
      ) : (
        <ModalContent
          open={open}
          opened={opened}
          visible={visible}
          placement={placement}
          finalSize={finalSize}
          ariaLabel={ariaLabel}
          hideOnClickOutside={hideOnClickOutside}
          hideOnEsc={hideOnEsc}
          preventBodyScroll={preventBodyScroll}
          handleClose={handleClose}
          className={className}
          backdropClassName={backdropClassName}
          dataTestId={dataTestId}
          customDialogStyles={customDialogStyles}
          customDialogBackdropStyles={customDialogBackdropStyles}
          isClosable={isClosable}
          handleOpen={handleOpen}
          handleToggle={handleToggle}
          finalId={finalId}
          image={image}
          imageAlt={imageAlt}
        >
          {children}
        </ModalContent>
      )}
    </>
  )
}
