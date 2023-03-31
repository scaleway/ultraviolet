import type { ComponentMeta } from '@storybook/react'
import { Popover } from '..'

export default {
  component: Popover,
  decorators: [StoryComponent => <StoryComponent />],
  title: 'Components/Overlay/Popover',
  parameters: {
    docs: {
      description: {
        component:
          'Popover is a component that displays a tooltip with a title and a close button. It is used to display additional information about an element on the page.',
      },
    },
  },
} as ComponentMeta<typeof Popover>

export { Playground } from './Playground.stories'
export { Uncontrolled } from './Uncontrolled.stories'
export { Controlled } from './Controlled.stories'
export { Variants } from './Variants.stories'
export { Sizes } from './Sizes.stories'
