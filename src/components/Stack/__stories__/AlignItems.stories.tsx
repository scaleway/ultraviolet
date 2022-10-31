import { Template, coloredChildren } from './Template.stories'

export const AlignItems = Template.bind({})

AlignItems.parameters = {
  docs: {
    storyDescription:
      'prop `alignItems` support every value of css property `align-items`',
  },
}

AlignItems.args = {
  children: coloredChildren,
  gap: 2,
  alignItems: 'center',
}
