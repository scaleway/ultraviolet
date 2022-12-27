import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  label: 'Toggle me on',
  name: 'label',
  disabled: true,
}
