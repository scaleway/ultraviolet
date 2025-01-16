import { Template } from './Template.stories'

export const Success = Template.bind({})
Success.args = {
  label: 'Verification code',
  success: 'Valid code',
  initialValue: '1337',
}

Success.parameters = {
  docs: {
    description: {
      story:
        'You can use `success` prop to indicate a success with the current value',
    },
  },
}
