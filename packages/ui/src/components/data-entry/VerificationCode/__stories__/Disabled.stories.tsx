import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  disabled: true,
  label: 'Verification code',
}

Disabled.parameters = {
  docs: {
    description: {
      story: 'Mark `VerificationCode` as disabled using `disabled` property.',
    },
  },
}
