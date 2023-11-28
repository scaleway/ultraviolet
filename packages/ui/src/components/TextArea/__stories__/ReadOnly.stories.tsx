import { Template } from './Template.stories'

export const ReadOnly = Template.bind({})

ReadOnly.args = {
  ...Template.args,
  readOnly: true,
}

ReadOnly.parameters = {
  docs: {
    description: {
      story:
        'Mark `TextArea` in an readOnly state using `readOnly` boolean property',
    },
  },
}
