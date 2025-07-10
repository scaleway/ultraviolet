import type { Meta } from '@storybook/react-vite'
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
export { WithSelectInputAsDisclosure } from './WithSelectInputAsDisclosure.stories'
export { WithSelectInput } from './WithSelectInput.stories'
export { FunctionChildren } from './FunctionChildren.stories'
export { WithTooltip } from './WithTooltip.stories'
export { AutoFocus } from './AutoFocus.stories'
export { Open } from './Open.stories'
export { NestedModal } from './NestedModal.stories'
export { Image } from './Image.stories'
export { Carousel } from './Carousel.stories'
