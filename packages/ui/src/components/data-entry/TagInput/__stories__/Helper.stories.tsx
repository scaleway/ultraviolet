import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = {
  ...Template.args,
  helper: 'Please enter a tag and press ENTER or SPACE to validate it.',
}
