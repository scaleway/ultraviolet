import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import zxcvbn from 'zxcvbn'
import PasswordStrengthMeter from '..'
import { colors } from '../../../theme'
import UncontrolledPasswordStrengthMeter from './UncontrolledPasswordStrengthMeter'

export default {
  component: PasswordStrengthMeter,
  parameters: {
    docs: {
      description: {
        component: 'Show strength of a password based on different criteria.',
      },
    },
  },
  title: 'Components/Data Entry/PasswordStrengthMeter',
} as Meta

const Template: Story<
  Omit<ComponentProps<typeof PasswordStrengthMeter>, 'title' | 'strength'>
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

export const Default = Template.bind({})

export const UserInputs = Template.bind({})
UserInputs.parameters = {
  docs: {
    storyDescription: `__userInputs__ properties can be used to specify which word shouldn't be used for a password. That way you can force user to avoid using sensitive data such as: their email, login, name, etc.

In this example try to type __thisisalongpassword__, the score should be really low as the word has been "banned" using __userInputs__ properties.`,
  },
}
UserInputs.args = {
  userInputs: ['thisisalongpassword'],
}
