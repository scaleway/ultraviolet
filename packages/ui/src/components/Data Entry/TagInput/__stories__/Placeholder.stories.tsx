import { Template } from './Template.stories'

export const Placeholder = Template.bind({})

Placeholder.args = {
  ...Template.args,
  placeholder: 'Please enter your tags',
  value: [],
}
