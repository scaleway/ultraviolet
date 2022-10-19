import { ComponentMeta } from '@storybook/react'
import Tabs from '..'
import { Tab } from '../Tab'

export default {
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: 'Tabs gives a navigation made out of tabs.',
      },
    },
  },
  subcomponents: { Tab },
  title: 'Components/Navigation/Tabs',
} as ComponentMeta<typeof Tabs>

export { Playground } from './Playground.stories'
export { Disabled } from './Disabled.stories'
export { Showcase } from './Showcase.stories'
export { WithBadge } from './WithBadge.stories'
export { WithCounter } from './WithCounter.stories'
export { WithMenu } from './WithMenu.stories'
export { MenuDisabled } from './MenuDisabled.stories'
