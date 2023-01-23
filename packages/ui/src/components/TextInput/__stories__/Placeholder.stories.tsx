import { Template } from './Template.stories'

export const Placeholder = Template.bind({})

Placeholder.args = {
  label: 'First Name',
  placeholder: 'Type your name',
}

Placeholder.parameters = {
  docs: {
    storyDescription:
      'Set a placeholder using `placeholder` property. It is only visible if the `TextInput` has been visited (an input is considered as visited after the first focus).',
  },
}
