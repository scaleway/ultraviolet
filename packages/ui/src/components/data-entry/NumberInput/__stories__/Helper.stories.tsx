import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = {
  helper: 'You should enter a number only',
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
}

Helper.parameters = {
  docs: {
    description: {
      story:
        'The `helper` prop can be used to display a helper message below the input. It can be used to provide additional information about the expected input.',
    },
  },
}
