import type { Meta } from '@storybook/react-vite'
import { PasswordCheck } from '..'

export default {
  component: PasswordCheck,
  title: 'UI/Feedback/PasswordCheck',
  parameters: {
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
  },
} as Meta<typeof PasswordCheck>

export { Playground } from './Playground.stories'
