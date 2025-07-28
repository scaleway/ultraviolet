import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  error: 'Your input is invalid',
}

Error.parameters = {
  docs: {
    description: {
      story: `The \`error\` prop can be used to display an error message below the input. It can be used to provide additional information about the expected input.`,
    },
  },
}
