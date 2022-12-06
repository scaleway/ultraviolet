import { Template } from './Template.stories'

export const Multiline = Template.bind({})

Multiline.args = {
  label: 'First Name',
  multiline: true,
}

Multiline.parameters = {
  docs: {
    storyDescription: 'Enable multiline mode using `multiline` property.',
  },
}
