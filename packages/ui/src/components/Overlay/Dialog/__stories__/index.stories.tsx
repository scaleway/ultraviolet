import type { Meta } from '@storybook/react-vite'
import { Dialog } from '..'

export default {
  component: Dialog,
  title: 'UI/Overlay/Dialog',
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: false,
      understandable: true,
      robust: false,
    },
  },
} as Meta<typeof Dialog>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Specifications } from './Specification.stories'
