import type { ComponentMeta } from '@storybook/react'
import { Tabs } from '..'
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

export { Playground } from './Playground'
export { Disabled } from './Disabled'
export { Showcase } from './Showcase'
export { WithBadge } from './WithBadge'
export { WithCounter } from './WithCounter'
export { WithMenu } from './WithMenu'
export { MenuDisabled } from './MenuDisabled'
