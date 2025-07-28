import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  addButton: {
    maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
    name: 'Add key-value',
    tooltip: 'This is a tooltip',
  },
  inputKey: {
    label: 'Key',
    required: true,
  },
  inputValue: {
    label: 'Value',
    required: false,
  },
  name: 'keyValues',
}
