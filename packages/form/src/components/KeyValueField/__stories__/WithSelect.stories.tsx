import { Template } from './Template.stories'
const keyOptions = [
  { value: 'key-1', label: 'First key' },
  { value: 'key-2', label: 'Second key' },
  { value: 'key-3', label: 'Third key' },
  { value: 'disabled', label: 'Disabled key', disabled: true },
]
const valueOption = [
  { value: 'value-1', label: 'First value' },
  { value: 'value-2', label: 'Second value' },
  { value: 'value-3', label: 'Third value' },
  { value: 'disabled', label: 'Disabled value', disabled: true },
]
export const WithSelect = Template.bind({})

WithSelect.args = {
  addButton: {
    maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
    name: 'Add key-value',
    tooltip: 'This is a tooltip',
  },
  inputKey: {
    label: 'Key',
    required: true,
    inputType: 'select',
    options: keyOptions,
  },
  inputValue: {
    label: 'Value',
    required: false,
    inputType: 'select',
    options: valueOption,
  },
  name: 'keyValues',
}
