import { Template } from './Template.stories'

export const Clearable = Template.bind({})

Clearable.args = {
  ...Template.args,
  clearable: true,
}
