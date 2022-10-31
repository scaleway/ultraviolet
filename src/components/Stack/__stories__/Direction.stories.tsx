import { Template, coloredChildren } from './Template.stories'

export const Direction = Template.bind({})

Direction.parameters = {
  docs: {
    storyDescription:
      'prop `Direction` allows the stack to behave as a column [DEFAULT] or a row',
  },
}

Direction.args = {
  gap: 2,
  direction: 'row',
  children: coloredChildren,
}
