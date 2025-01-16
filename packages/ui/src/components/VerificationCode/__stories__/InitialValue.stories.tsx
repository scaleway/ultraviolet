import { Template } from './Template.stories'

export const InitialValue = Template.bind({})
InitialValue.args = {
  label: 'Verification code',
  initialValue: '1337',
}

InitialValue.parameters = {
  docs: {
    description: {
      story:
        'use `initialValue` prop to set the initial value of a VerificationCode component',
    },
  },
}
