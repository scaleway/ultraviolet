import { Template } from './Template.stories'

export const ReadOnly = Template.bind({})

ReadOnly.args = {
  ...Template.args,
  readOnly: true,
}
