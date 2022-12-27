import { Template } from './Template.stories'

export const Fields = Template.bind({})
Fields.args = {
  fields: 6,
}

Fields.parameters = {
  docs: {
    storyDescription:
      'use `fields` prop to set the amount of field case you want to have',
  },
}
