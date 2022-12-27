import { Template } from './Template.stories'

export const DefaultTags = Template.bind({})

DefaultTags.args = {
  ...Template.args,
  name: 'defaultTags',
  tags: ['tag1', 'tag2'],
}
