import { Template } from './Template'

export const ToggleableRequired = Template.bind({})

ToggleableRequired.args = {
  label: 'Password',
  defaultValue: 'my-safe-password',
  type: 'toggleable-password',
  required: true,
}
