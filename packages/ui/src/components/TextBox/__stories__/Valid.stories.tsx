import { Template } from './Template.stories'

export const Valid = Template.bind({})

Valid.args = {
  label: 'First Name',
  valid: true,
}

Valid.parameters = {
  docs: {
    storyDescription: 'Add a check mark using `valid` property.',
  },
}
