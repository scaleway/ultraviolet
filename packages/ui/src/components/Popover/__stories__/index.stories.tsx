import type { Meta } from '@storybook/react'
import { Popover } from '..'

export default {
  component: Popover,
  decorators: [StoryComponent => <StoryComponent />],
  title: 'Components/Overlay/Popover',
} as Meta<typeof Popover>

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
export { Sentiments } from './Sentiments.stories'
export { Sizes } from './Sizes.stories'
