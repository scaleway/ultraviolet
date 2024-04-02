import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  name: 'keyValues',
  inputKey: {
    label: 'Key',
    required: true,
  },
  inputValue: {
    label: 'Value',
    required: false,
  },
  addButton: {
    name: 'Add key-value',
    tooltip: 'This is a tooltip',
    maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
  },
}
