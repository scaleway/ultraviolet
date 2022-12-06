import { Template } from './Template.stories'

export const Required = Template.bind({})

Required.args = {
  label: 'First Name',
  required: true,
}

Required.parameters = {
  docs: {
    storyDescription: 'Add a required mark using `required` property.',
  },
}
