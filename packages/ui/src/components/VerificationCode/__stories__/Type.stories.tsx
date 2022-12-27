import { Template } from './Template.stories'

export const Type = Template.bind({})
Type.args = {
  type: 'text',
}

Type.parameters = {
  docs: {
    storyDescription: 'use `type` prop to allow letter',
  },
}
