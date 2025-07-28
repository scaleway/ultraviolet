import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  disabled: true,
  label: 'Toggle me on',
  name: 'label',
}
