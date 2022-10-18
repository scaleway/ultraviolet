import { Meta } from '@storybook/react'
import Tabs from '..'
import Tab from '../Tab'

export default {
  args: {
    children: [<Tabs.Tab>Choice 1</Tabs.Tab>],
    selected: 0,
  },
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
} as Meta

export { Playground } from './Playground.stories'
export { Disabled } from './Disabled.stories'
export { Showcase } from './Showcase.stories'
export { WithBadge } from './WithBadge.stories'
export { WithMenu } from './WithMenu.stories'
export { MenuDisabled } from './MenuDisabled.stories'
