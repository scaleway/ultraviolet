import { ActionBar } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: ActionBar,
  title: 'UI/Overlay/ActionBar',
  parameters: {
    a11y: 'partial',
  },
} as Meta

export { Playground } from './Playground.stories'
export { Ranks } from './Ranks.stories'
