import type { Meta } from '@storybook/react'
import { Dialog } from '..'

export default {
  component: Dialog,
  title: 'Components/Overlay/Dialog',
  parameters: {
    experimental: true,
  },
  tags: ['experimental'],
} as Meta<typeof Dialog>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Specifications } from './Specification.stories'
