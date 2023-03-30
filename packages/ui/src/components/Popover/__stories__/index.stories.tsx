import type { ComponentMeta } from '@storybook/react'
import { Popover } from '..'

export default {
  component: Popover,
  decorators: [StoryComponent => <StoryComponent />],
  title: 'Components/Overlay/Popover',
} as ComponentMeta<typeof Popover>

export { Playground } from './Playground.stories'
