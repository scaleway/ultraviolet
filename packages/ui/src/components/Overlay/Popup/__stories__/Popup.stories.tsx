import type { Meta } from '@storybook/react-vite'
import { Popup } from '..'

export default {
  component: Popup,
  title: 'UI/Overlay/Popup',
  tags: ['local'],
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },

    docs: {
      description: {
        component:
          'Baseline stories for the current `Popup` implementation. This component is experimental and will be refactored into a compound component API built on `@floating-ui/react`. These stories document the current behavior so the new implementation can be compared against it.',
      },
    },
  },
} as Meta<typeof Popup>

export { Playground } from './Playground.stories'
export { Trigger } from './Trigger.stories'
export { Placement } from './Placement.stories'
export { Arrow } from './Arrow.stories'
export { Controlled } from './Controlled.stories'
export { MatchTriggerWidth } from './MatchTriggerWidth.stories'
export { FocusTrap } from './FocusTrap.stories'
