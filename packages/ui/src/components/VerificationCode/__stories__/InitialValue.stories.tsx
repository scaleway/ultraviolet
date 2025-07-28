import { Template } from './Template.stories'

export const InitialValue = Template.bind({})
InitialValue.args = {
  initialValue: '1337',
  label: 'Verification code',
}

InitialValue.parameters = {
  docs: {
    description: {
      story:
        'use `initialValue` prop to set the initial value of a VerificationCode component',
    },
  },
}
