import { Template } from './Template.stories'

export const DefaultTagInput = Template.bind({})

DefaultTagInput.args = {
  ...Template.args,
  name: 'defaultTagInput',
  tags: ['tag1', 'tag2'],
}
