import type { Meta } from '@storybook/react-vite'
import { ActionBar } from '..'

export default {
  component: ActionBar,
  title: 'UI/Overlay/ActionBar',
  tags: [],
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} satisfies Meta<typeof ActionBar>

export { Playground } from './Playground.stories'
export { Ranks } from './Ranks.stories'
