import { Template } from './Template.stories'

export const Edition = Template.bind({})
Edition.args = {
  title: 'Title',
  edition: true,
}
Edition.parameters = {
  docs: {
    storyDescription:
      'You can specify `edition` props, the border will be darker',
  },
}
