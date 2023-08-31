import type { ReactNode } from 'react'
import type React from 'react'

export type ModalSize = 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall'

export type ModalPlacement =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'right'
  | 'left'

export type ModalState = {
  onOpen: () => void
  onClose: () => void
  toggle: () => void
  visible: boolean
  modalId: string
}

export type DisclosureProps = {
  disclosure?: ReactNode | ((state: ModalState) => ReactNode)
  handleOpen: ModalState['onOpen']
  handleClose: ModalState['onClose']
  visible: ModalState['visible']
  toggle: ModalState['toggle']
  id: string
}

export type DialogProps = {
  ariaLabel?: string
  backdropClassName?: string
  id: string
  open: boolean
  size: ModalSize
  className?: string
  placement: ModalPlacement
  hideOnClickOutside?: boolean
  hideOnEsc?: boolean
  preventBodyScroll?: boolean
  onClose: () => void
  'data-testid'?: string
  children: ReactNode
  backdropCss: React.JSX.IntrinsicAttributes['css']
  dialogCss: React.JSX.IntrinsicAttributes['css']
}
