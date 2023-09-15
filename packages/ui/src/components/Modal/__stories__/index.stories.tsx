import type { Meta } from '@storybook/react'
import { Modal } from '..'

export default {
  component: Modal,
  title: 'Components/Overlay/Modal',
} as Meta<typeof Modal>

export { Playground } from './Playground.stories'
export { ToggleStory as Toggle } from './Toggle.stories'
export { WithLotsOfContent } from './WithLotsOfContent.stories'
export { Size } from './Size.stories'
export { Placement } from './Placement.stories'
export { PreventBodyScroll } from './PreventBodyScroll.stories'
export { HideOnClickOutside } from './HideOnClickOutside.stories'
export { HideOnEsc } from './HideOnEsc.stories'
export { IsClosable } from './IsClosable.stories'
export { WithDisclosureFunction } from './WithDisclosureFunction.stories'
export { WithDisclosureBeingANativeElement } from './WithDisclosureBeingANativeElement.stories'
export { FunctionChildren } from './FunctionChildren.stories'
export { WithTooltip } from './WithTooltip.stories'
