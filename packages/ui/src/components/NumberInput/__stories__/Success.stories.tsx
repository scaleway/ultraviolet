import { Template } from './Template.stories'

export const Success = Template.bind({})

Success.args = {
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  success: 'Your input is valid',
}

Success.parameters = {
  docs: {
    description: {
      story:
        'The `success` prop can be used to display a success message below the input. It can be used to provide additional information about the expected input.',
    },
  },
}
