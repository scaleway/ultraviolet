import styled from '@emotion/styled'
import { type ComponentProps, useMemo } from 'react'
import { Bullet } from '../Bullet'
import { Modal } from '../Modal'
import { Text } from '../Text'
import type { DialogContextType } from './Context'
import { DialogContext, useDialogContext } from './Context'
import type { DialogSentiment } from './constants'
import { DialogButton } from './subComponents/Button'
import { DialogButtons } from './subComponents/Buttons'
import { DialogCancelButton } from './subComponents/CancelButton'
import { DialogStack } from './subComponents/Stack'
import { DialogText } from './subComponents/Text'

const DIALOG_SIZE = 'xsmall'

const StyledTextTitle = styled(Text)`
  margin-top: ${({ theme }) => theme.space['2']};
  margin-bottom: ${({ theme }) => theme.space['1']};
`

const StyledModal = styled(Modal)`
    &[data-size="${DIALOG_SIZE}"] {
      width: 27.5rem; // size is on purpose different than a modal
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
      <Bullet
        sentiment={sentiment}
        icon={
          sentiment === 'warning' || sentiment === 'danger'
            ? 'information-outline'
            : 'check'
        }
      />
      <StyledTextTitle
        as="h2"
        variant="headingSmallStronger"
        sentiment="neutral"
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
 * @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const Dialog = Object.assign(BaseDialog, {
  Buttons: DialogButtons,
  Button: DialogButton,
  CancelButton: DialogCancelButton,
  Stack: DialogStack,
  Text: DialogText,
  useDialogContext,
})
