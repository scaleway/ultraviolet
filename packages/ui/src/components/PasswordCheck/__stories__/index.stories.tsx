import type { Meta } from '@storybook/react'
import { PasswordCheck } from '..'

export default {
  component: PasswordCheck,
  parameters: {
    docs: {
      description: {
        component:
          'Password checker shows what is missing into password to validate requirements.',
      },
    },
  },
  title: 'Components/Feedback/PasswordCheck',
} as Meta<typeof PasswordCheck>

export { Playground } from './Playground.stories'
