import { Template } from './Template.stories'

export const RightTitle = Template.bind({})
RightTitle.args = {
  title: 'Title',
  rightTitle: 'rightTitle as string',
}
RightTitle.parameters = {
  docs: {
    storyDescription:
      'You can specify `rightTitle` prop to add an extra node or a text on the right of title',
  },
}
