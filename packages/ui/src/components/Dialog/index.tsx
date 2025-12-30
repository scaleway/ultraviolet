'use client'

import { AlertCircleIcon, CheckIcon } from '@ultraviolet/icons'
import { cn } from '@ultraviolet/utils'
import type { ComponentProps } from 'react'
import { useMemo } from 'react'
import { Bullet } from '../Bullet'
import { Modal } from '../Modal'
import { Text } from '../Text'
import type { DialogContextType } from './Context'
import { DialogContext, useDialogContext } from './Context'
import { DialogButton } from './components/Button'
import { DialogButtons } from './components/Buttons'
import { DialogCancelButton } from './components/CancelButton'
import { DialogStack } from './components/Stack'
import { DialogText } from './components/Text'
import type { DialogSentiment } from './constants'
import { dialogTitle, dialogXsmall } from './styles.css'

const DIALOG_SIZE = 'xsmall'

type DialogProps = Pick<
  ComponentProps<typeof Modal>,
  | 'ariaLabel'
  | 'children'
  | 'className'
  | 'data-testid'
  | 'disclosure'
  | 'hideOnClickOutside'
  | 'hideOnEsc'
  | 'id'
  | 'isClosable'
  | 'onBeforeClose'
  | 'onClose'
  | 'open'
  | 'placement'
  | 'style'
> & {
  title: string
  sentiment: DialogSentiment
}

export const BaseDialog = ({
  ariaLabel,
  className,
  children,
  'data-testid': dataTestId,
  disclosure,
  hideOnClickOutside,
  hideOnEsc,
  id,
  isClosable,
  onBeforeClose,
  onClose,
  open,
  placement,
  sentiment,
  title,
  style,
}: DialogProps) => {
  const headerContent = (
    <>
      <Bullet sentiment={sentiment}>
        {sentiment === 'warning' || sentiment === 'danger' ? (
          <AlertCircleIcon />
        ) : (
          <CheckIcon />
        )}
      </Bullet>
      <Text
        as="h2"
        className={dialogTitle}
        sentiment="neutral"
        variant="headingSmallStronger"
      >
        {title}
      </Text>
    </>
  )

  const contextValue = useMemo<DialogContextType>(
    () => ({
      sentiment,
    }),
    [sentiment],
  )

  return (
    <Modal
      ariaLabel={ariaLabel}
      className={cn(className, dialogXsmall)}
      data-testid={dataTestId}
      disclosure={disclosure}
      hideOnClickOutside={hideOnClickOutside}
      hideOnEsc={hideOnEsc}
      id={id}
      isClosable={isClosable}
      onBeforeClose={onBeforeClose}
      onClose={onClose}
      open={open}
      placement={placement}
      size={DIALOG_SIZE}
      style={style}
    >
      {modalProps =>
        typeof children === 'function' ? (
          <DialogContext.Provider value={contextValue}>
            {headerContent}
            {children(modalProps)}
          </DialogContext.Provider>
        ) : (
          <DialogContext.Provider value={contextValue}>
            {headerContent}
            {children}
          </DialogContext.Provider>
        )
      }
    </Modal>
  )
}

/**
 * The Dialog component is used to show content on top of an overlay that requires user interaction.
 */
export const Dialog = Object.assign(BaseDialog, {
  Button: DialogButton,
  Buttons: DialogButtons,
  CancelButton: DialogCancelButton,
  Stack: DialogStack,
  Text: DialogText,
  useDialogContext,
})
