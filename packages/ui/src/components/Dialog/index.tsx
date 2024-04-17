import styled from '@emotion/styled'
import type { ComponentProps } from 'react'
import type { SENTIMENTS } from 'src/theme'
import { Bullet } from '../Bullet'
import { Modal } from '../Modal'
import { Text } from '../Text'
import { DialogButtons } from './subComponents/Buttons'
import { DialogCancelButton } from './subComponents/CancelButton'
import { DialogStack } from './subComponents/Stack'
import { DialogText } from './subComponents/Text'

export const DIALOG_SENTIMENTS = [
  'primary',
  'success',
  'warning',
  'danger',
] satisfies (typeof SENTIMENTS)[number][]
type DialogSentiment = (typeof DIALOG_SENTIMENTS)[number]

const StyledTextTitle = styled(Text)`
  margin-top: ${({ theme }) => theme.space['2']};
  margin-bottom: ${({ theme }) => theme.space['1']};
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
      <StyledTextTitle as="h2" variant="headingSmallStronger">
        {title}
      </StyledTextTitle>
    </>
  )

  return (
    <Modal
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
      size="xsmall"
    >
      {typeof children === 'function' ? (
        modalProps => (
          <>
            {headerContent}
            {children(modalProps)}
          </>
        )
      ) : (
        <>
          {headerContent}
          {children}
        </>
      )}
    </Modal>
  )
}

/**
 * List is a component that displays a list of items based on the columns you provide and the data you pass.
 */
export const Dialog = Object.assign(BaseDialog, {
  Buttons: DialogButtons,
  CancelButton: DialogCancelButton,
  Stack: DialogStack,
  Text: DialogText,
})
