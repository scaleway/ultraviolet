import { Template } from './Template.stories'

export const Small = Template.bind({})
Small.args = {
  title: 'Title',
  small: true,
}
Small.parameters = {
  docs: {
    storyDescription:
      'You can specify `small`, the content vertical padding will be smaller',
  },
}
