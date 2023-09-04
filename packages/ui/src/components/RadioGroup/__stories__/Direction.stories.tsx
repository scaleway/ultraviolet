import { Template } from './Template.stories'

export const Direction = Template.bind({})

Direction.args = {
  direction: 'row',
}

Direction.parameters = {
  docs: {
    storyDescription:
      'Use the `direction` prop to change the direction of the group.',
  },
}
