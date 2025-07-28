import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  disabled: false,
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  readOnly: false,
}
