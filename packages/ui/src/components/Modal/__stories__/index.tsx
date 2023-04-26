import type { ComponentMeta } from '@storybook/react'
import { Modal } from '..'

export default {
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: `Documentation is here https://reakit.io/docs/dialog/#props

By default now our modal is a portal. If you want to change this you can disabled modal props but be aware of https://reakit.io/docs/dialog/#non-modal-dialogs`,
      },
    },
  },
  title: 'Components/Overlay/Modal',
} as ComponentMeta<typeof Modal>

export { Playground } from './Playground'
export { ToggleStory as Toggle } from './Toggle'
export { WithLotsOfContent } from './WithLotsOfContent'
export { Animated } from './Animated'
export { Width } from './Width'
export { Placement } from './Placement'
export { Height } from './Height'
export { PreventBodyScroll } from './PreventBodyScroll'
export { HideOnClickOutside } from './HideOnClickOutside'
export { HideOnEsc } from './HideOnEsc'
export { ModalProp } from './ModalProp'
export { IsClosable } from './IsClosable'
export { NotBordered } from './NotBordered'
export { CustomStyle } from './CustomStyle'
export { WithDisclosureFunction } from './WithDisclosureFunction'
export { WithDisclosureBeingANativeElement } from './WithDisclosureBeingANativeElement'
export { FunctionChildren } from './FunctionChildren'
