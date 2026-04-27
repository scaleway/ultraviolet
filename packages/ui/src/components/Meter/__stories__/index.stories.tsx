import { Meter } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: Meter,
  title: 'UI/Feedback/Meter',
  parameters: {
    a11y: 'partial',
  },
} as Meta<typeof Meter>

export { Playground } from './Playground.stories'
