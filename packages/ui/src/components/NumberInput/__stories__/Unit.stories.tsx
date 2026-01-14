import { Template } from './Template.stories'

export const Unit = Template.bind({})

Unit.args = {
  helper: 'You should enter a number between 0 and 100',
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  unit: 'GB',
}

Unit.parameters = {
  docs: {
    description: {
      story: 'The `unit` prop can be used to display a unit next to the input.',
    },
  },
}
