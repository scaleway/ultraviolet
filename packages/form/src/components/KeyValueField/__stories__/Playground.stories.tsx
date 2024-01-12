import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  name: 'keyValues',
  inputKey: {
    label: 'key',
    required: true,
  },
  inputValue: {
    label: 'value',
    required: false,
  },
  addButton: {
    name: 'Add key-value',
    tooltip: 'This is a tooltip',
    tooltipAlert: 'This is a tooltip alert',
  },
}
