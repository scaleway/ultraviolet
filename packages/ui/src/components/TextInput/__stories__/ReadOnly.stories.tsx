import { Template } from './Template.stories'

export const ReadOnly = Template.bind({})

ReadOnly.args = {
  label: 'First Name',
  defaultValue: 'James Bond',
  readOnly: true,
}

ReadOnly.parameters = {
  docs: {
    description: {
      story: 'Mark `TextInput` as read only using `readOnly` property.',
    },
  },
}
