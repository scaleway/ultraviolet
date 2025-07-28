import { Template } from './Template.stories'

export const Success = Template.bind({})
Success.args = {
  initialValue: '1337',
  label: 'Verification code',
  success: 'Valid code',
}

Success.parameters = {
  docs: {
    description: {
      story:
        'You can use `success` prop to indicate a success with the current value',
    },
  },
}
