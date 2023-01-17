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

export { Playground } from './Playground.stories'
export { Switch } from './Switch.stories'
export { WithLotsOfContent } from './WithLotsOfContent.stories'
export { Animated } from './Animated.stories'
export { Width } from './Width.stories'
export { Placement } from './Placement.stories'
export { Height } from './Height.stories'
export { PreventBodyScroll } from './PreventBodyScroll.stories'
export { HideOnClickOutside } from './HideOnClickOutside.stories'
export { HideOnEsc } from './HideOnEsc.stories'
export { ModalProp } from './ModalProp.stories'
export { IsClosable } from './IsClosable.stories'
export { NotBordered } from './NotBordered.stories'
export { CustomStyle } from './CustomStyle.stories'
export { WithDisclosureFunction } from './WithDisclosureFunction.stories'
export { WithDisclosureBeingANativeElement } from './WithDisclosureBeingANativeElement.stories'
export { FunctionChildren } from './FunctionChildren.stories'
