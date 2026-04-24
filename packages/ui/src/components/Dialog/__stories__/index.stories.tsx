import { Dialog } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Dialog,
  title: 'UI/Overlay/Dialog',
  parameters: {
    a11y: 'partial',
  },
} as Meta<typeof Dialog>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Specifications } from './Specification.stories'
