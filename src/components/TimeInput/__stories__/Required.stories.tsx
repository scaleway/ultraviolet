import { Template } from './Template.stories'

export const Required = Template.bind({})

Required.args = {
  required: true,
}

Required.parameters = {
  docs: {
    storyDescription: 'Add a required mark using `required` property.',
  },
}
