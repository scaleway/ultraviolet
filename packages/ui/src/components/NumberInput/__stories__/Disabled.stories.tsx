import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  disabled: true,
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
}

Disabled.parameters = {
  docs: {
    description: {
      story:
        'The `disabled` prop can be used to disable the input. Disabled inputs cannot be focused.',
    },
  },
}
