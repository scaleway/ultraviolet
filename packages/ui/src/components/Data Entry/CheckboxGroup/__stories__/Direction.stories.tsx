import { Template } from './Template.stories'

export const Direction = Template.bind({})

Direction.args = {
  direction: 'row',
}

Direction.parameters = {
  docs: {
    description: {
      story: 'Use the `direction` prop to change the direction of the group.',
    },
  },
}
