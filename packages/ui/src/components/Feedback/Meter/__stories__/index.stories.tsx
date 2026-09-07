import type { Meta } from '@storybook/react-vite'
import { Meter } from '..'

export default {
  component: Meter,
  title: 'UI/Feedback/Meter',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
  },
} as Meta<typeof Meter>

export { Playground } from './Playground.stories'
