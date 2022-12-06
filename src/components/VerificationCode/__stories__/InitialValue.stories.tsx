import { Template } from './Template.stories'

export const InitialValue = Template.bind({})
InitialValue.args = {
  initialValue: '1337',
}

InitialValue.parameters = {
  docs: {
    storyDescription:
      'use `initialValue` prop to set the initial value of a VerificationCode component',
  },
}
