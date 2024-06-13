import { Template } from './Template.stories'

export const Controls = Template.bind({})

Controls.args = {
  readOnly: false,
  disabled: false,
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  controls: false,
}
