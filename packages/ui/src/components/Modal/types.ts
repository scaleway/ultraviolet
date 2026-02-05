import type { CSSProperties, ReactElement, ReactNode, RefObject } from 'react'

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
  toggle: () => void
  visible: boolean
  modalId: string
  close: () => void
  show: () => void
}

export type DisclosureProps = {
  disclosure?: ReactElement | ((state: ModalState) => ReactElement)
  handleOpen: ModalState['show']
  handleClose: ModalState['close']
  visible: ModalState['visible']
  toggle: ModalState['toggle']
  id: string
  ref: RefObject<HTMLDivElement | null>
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
  image?: string
  style?: CSSProperties
  ref?: RefObject<HTMLDialogElement | null>
}
