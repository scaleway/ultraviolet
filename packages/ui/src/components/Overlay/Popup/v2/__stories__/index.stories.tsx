import type { Meta } from '@storybook/react-vite'
import { PopupV2 } from '..'

export default {
  title: 'UI/Overlay/PopupV2',
  component: PopupV2.Root,
  subcomponents: {
    "PopupV2.Trigger": PopupV2.Trigger,
    "PopupV2.Panel": PopupV2.Panel,
  },
  tags: ['internal'],
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: true,
      understandable: true,
      robust: true,
    },
    internal: true,
    docs: {
      description: {
        component:
          'General purpose `Popup` component to use in other components like `Popover`, `SelectInput` etc.',
      },
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Triggers } from './Triggers.stories'
export { Placement } from './Placement.stories'
export { Examples } from './Examples.stories'
export { Arrow } from './Arrow.stories'
export { Controlled } from './Controlled.stories'
export { MatchTriggerWidth } from './MatchTriggerWidth.stories'
export { FocusTrap } from './FocusTrap.stories'
