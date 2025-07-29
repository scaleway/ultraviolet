import type { Meta } from '@storybook/react-vite'
import { Popover } from '..'

export default {
  component: Popover,
  title: 'Components/Overlay/Popover',
} as Meta<typeof Popover>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Sizes } from './Sizes.stories'
export { AdvancedUsage } from './AdvancedUsage.stories'
