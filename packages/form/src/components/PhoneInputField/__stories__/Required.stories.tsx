import { Template } from './Template.stories'

export const Required = Template.bind({})

Required.args = {
  ...Template.args,
  label: 'Phone Number',
  name: 'phone',
  required: true,
}
