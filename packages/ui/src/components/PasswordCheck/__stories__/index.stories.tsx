import { PasswordCheck } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: PasswordCheck,
  title: 'UI/Feedback/PasswordCheck',
  parameters: {
    a11y: 'partial',
  },
} as Meta<typeof PasswordCheck>

export { Playground } from './Playground.stories'
