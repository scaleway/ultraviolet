import { Template } from './Template.stories'

export const Required = Template.bind({})

Required.args = {
  label: 'Toggle me on',
  name: 'label',
  required: true,
}
