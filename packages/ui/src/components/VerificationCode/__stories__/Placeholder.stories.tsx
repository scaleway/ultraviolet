import { Template } from './Template.stories'

export const Placeholder = Template.bind({})
Placeholder.args = {
  label: 'Verification code',
  placeholder: '0000',
}

Placeholder.parameters = {
  docs: {
    description: {
      story:
        'use `placeholder` prop to set the placeholder of a VerificationCode component',
    },
  },
}
