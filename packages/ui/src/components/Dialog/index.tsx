'use client'

import styled from '@emotion/styled'
import { AlertCircleIcon, CheckIcon } from '@ultraviolet/icons'
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

const DIALOG_SIZE = 'xsmall'

const StyledTextTitle = styled(Text)`
  margin-top: ${({ theme }) => theme.space['2']};
  margin-bottom: ${({ theme }) => theme.space['1']};
`

const StyledModal = styled(Modal)`
    &[data-size="${DIALOG_SIZE}"] {
      width: 32.5rem; // size is on purpose different than a modal
    }
`

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
      <StyledTextTitle
        as="h2"
        sentiment="neutral"
        variant="headingSmallStronger"
      >
        {title}
      </StyledTextTitle>
    </>
  )

  const contextValue = useMemo<DialogContextType>(
    () => ({
      sentiment,
    }),
    [sentiment],
  )

  return (
    <StyledModal
      ariaLabel={ariaLabel}
      className={className}
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
    </StyledModal>
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
