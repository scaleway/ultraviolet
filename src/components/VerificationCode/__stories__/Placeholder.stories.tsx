import { Template } from './Template.stories'

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: '0000',
}

Placeholder.parameters = {
  docs: {
    storyDescription:
      'use `placeholder` prop to set the placeholder of a VerificationCode component',
  },
}
