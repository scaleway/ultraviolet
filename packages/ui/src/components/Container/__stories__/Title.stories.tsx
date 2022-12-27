import { Template } from './Template.stories'

export const Title = Template.bind({})
Title.args = {
  title: 'Title',
}
Title.parameters = {
  docs: {
    storyDescription:
      'You can specify `title` prop to add a title to the container.',
  },
}
