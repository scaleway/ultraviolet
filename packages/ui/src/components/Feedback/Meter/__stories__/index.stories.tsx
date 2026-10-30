import type { Meta } from '@storybook/react-vite'
import { Meter } from '..'

export default {
  component: Meter,
  title: 'UI/Feedback/Meter',
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: true,
      understandable: true,
      robust: false,
    },
  },
} as Meta<typeof Meter>

export { Playground } from './Playground.stories'
