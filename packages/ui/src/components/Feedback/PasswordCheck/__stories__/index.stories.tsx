import type { Meta } from '@storybook/react-vite'
import { PasswordCheck } from '..'

export default {
  component: PasswordCheck,
  title: 'UI/Feedback/PasswordCheck',
  parameters: {
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
  },
} as Meta<typeof PasswordCheck>

export { Playground } from './Playground.stories'
