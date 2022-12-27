import { Template } from './Template.stories'

export const Placeholder = Template.bind({})

Placeholder.args = {
  ...Template.args,
  name: 'placeholder',
  placeholder: 'Placeholder',
}
