import { ActionBar } from '..'

import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof ActionBar> = {
  component: ActionBar,
  title: 'UI/Overlay/ActionBar',
  tags: ['test'],
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
}

export default meta

export { Playground } from './Playground.stories'
export { Ranks } from './Ranks.stories'
