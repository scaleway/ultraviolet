import type { Meta } from '@storybook/react-vite'
import { ActionBar } from '..'

export default {
  component: ActionBar,
  title: 'UI/Overlay/ActionBar',
  tags: [],
  parameters: {
    a11yStatus: 'partial',
    a11y: {
      test: 'error',
    },
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} satisfies Meta<typeof ActionBar>

export { Playground } from './Playground.stories'
export { Ranks } from './Ranks.stories'
