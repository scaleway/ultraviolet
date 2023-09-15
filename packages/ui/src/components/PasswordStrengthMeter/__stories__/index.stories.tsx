import type { Meta } from '@storybook/react'
import { PasswordStrengthMeter } from '..'

export default {
  component: PasswordStrengthMeter,
  parameters: {
    deprecated: true,
    deprecatedReason: 'This component is deprecated, please use Meter instead.',
  },
  title: 'Components/Feedback/PasswordStrengthMeter',
} as Meta<typeof PasswordStrengthMeter>

export { Playground } from './Playground.stories'
export { ForbiddenInputs } from './ForbiddenInputs.stories'
export { Estimate } from './Estimate.stories'
