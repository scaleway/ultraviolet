import type { Meta } from '@storybook/react-vite'
import { ActionBar } from '..'

export default {
  component: ActionBar,
  title: 'UI/Overlay/ActionBar',
  parameters: {
    a11y: 'partial',
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Ranks } from './Ranks.stories'
