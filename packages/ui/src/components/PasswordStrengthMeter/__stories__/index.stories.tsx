import type { ComponentMeta } from '@storybook/react'
import PasswordStrengthMeter from '..'

export default {
  component: PasswordStrengthMeter,
  parameters: {
    docs: {
      description: {
        component: 'Show strength of a password based on different criteria.',
      },
    },
  },
  title: 'Components/Feedback/PasswordStrengthMeter',
} as ComponentMeta<typeof PasswordStrengthMeter>

export { Playground } from './Playground.stories'
export { UserInputs } from './UserInputs.stories'
