import { Template } from './Template.stories'

export const Placeholder = Template.bind({})

Placeholder.args = {
  ...Template.args,
  tags: [],
  placeholder: 'Please enter your tags',
}
