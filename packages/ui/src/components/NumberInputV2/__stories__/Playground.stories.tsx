import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  readOnly: false,
  disabled: false,
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
}
