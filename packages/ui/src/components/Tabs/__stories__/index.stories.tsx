import type { Meta } from '@storybook/react'
import { Tabs } from '..'
import { Tab } from '../Tab'

export default {
  component: Tabs,
  subcomponents: { Tab },
  title: 'Components/Navigation/Tabs',
} as Meta<typeof Tabs>

export { Playground } from './Playground.stories'
export { Disabled } from './Disabled.stories'
export { Showcase } from './Showcase.stories'
export { WithBadge } from './WithBadge.stories'
export { WithCounter } from './WithCounter.stories'
export { WithMenu } from './WithMenu.stories'
export { MenuDisabled } from './MenuDisabled.stories'
