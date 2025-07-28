import type { Meta } from '@storybook/react-vite'
import { Tabs } from '..'

export default {
  component: Tabs,
  subcomponents: { 'Tabs.Tab': Tabs.Tab },
  title: 'Components/Navigation/Tabs',
} as Meta<typeof Tabs>

export { Disabled } from './Disabled.stories'
export { MenuDisabled } from './MenuDisabled.stories'
export { Playground } from './Playground.stories'
export { Showcase } from './Showcase.stories'
export { WithBadge } from './WithBadge.stories'
export { WithCounter } from './WithCounter.stories'
export { WithMenu } from './WithMenu.stories'
export { WithSubtitle } from './WithSubtitle.stories'
