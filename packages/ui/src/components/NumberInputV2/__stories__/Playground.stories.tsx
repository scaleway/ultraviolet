import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  disabled: false,
  readOnly: false,
  id: 'number-input',
  label: 'Number Input',
  max: 100,
  min: 0,
  name: 'number-input',
  onChange: () => {},
  placeholder: '50',
  size: 'medium',
  step: 1,
  unit: '€',
  helper: 'It should be a number higher than 0 and lower than 100',
  required: true,
}
