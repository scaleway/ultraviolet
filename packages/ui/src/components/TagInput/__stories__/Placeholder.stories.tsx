import { Template } from './Template.stories'

export const Placeholder = Template.bind({})

Placeholder.args = {
  ...Template.args,
  value: [],
  placeholder: 'Please enter your tags',
}
