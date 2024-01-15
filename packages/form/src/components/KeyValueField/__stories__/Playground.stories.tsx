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
    maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
  },
}
