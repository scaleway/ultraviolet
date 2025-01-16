import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  label: 'Verification code',
  disabled: true,
}

Disabled.parameters = {
  docs: {
    description: {
      story: 'Mark `VerificationCode` as disabled using `disabled` property.',
    },
  },
}
