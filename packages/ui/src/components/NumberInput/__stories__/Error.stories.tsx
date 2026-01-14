import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  error: 'Your input is invalid',
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
}

Error.parameters = {
  docs: {
    description: {
      story:
        'The `error` prop can be used to display an error message below the input. It can be used to provide additional information about the expected input.',
    },
  },
}
