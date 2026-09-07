import { Template } from './Template.stories'

export const Placeholder = Template.bind({})

Placeholder.args = {
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  placeholder: '50',
}

Placeholder.parameters = {
  docs: {
    description: {
      story:
        'The `placeholder` prop can be used to display a placeholder text when the input is empty. It can be used to provide additional information about the expected input.',
    },
  },
}
