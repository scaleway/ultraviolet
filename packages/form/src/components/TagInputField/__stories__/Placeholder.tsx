import { Template } from './Template'

export const Placeholder = Template.bind({})

Placeholder.args = {
  ...Template.args,
  name: 'placeholder',
  placeholder: 'Placeholder',
}
