import type { Story } from '@storybook/react'
import zxcvbn from 'zxcvbn'
import type { PasswordStrengthMeter } from '..'
import { colors } from '../../../theme'
import { UncontrolledPasswordStrengthMeter } from './UncontrolledPasswordStrengthMeter'

export const Template: Story<
  Omit<typeof PasswordStrengthMeter, 'title' | 'strength'>
> = args => (
  <UncontrolledPasswordStrengthMeter
    name="basic"
    estimate={zxcvbn}
    title="Password Strength"
    strength={[
      { color: colors.danger.text, t: 'veryWeak' },
      { color: colors.warning.text, t: 'weak' },
      { color: colors.warning.text, t: 'medium' },
      { color: colors.success.text, t: 'strong' },
      { color: colors.success.text, t: 'veryStrong' },
    ]}
    {...args}
  />
)
