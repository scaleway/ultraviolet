import { Template, coloredChildren } from './Template.stories'

export const JustifyContent = Template.bind({})

JustifyContent.parameters = {
  docs: {
    storyDescription:
      'prop `justifyContent` support every value of css property `justify-content`',
  },
}

JustifyContent.args = {
  direction: 'row',
  justifyContent: 'space-between',
  children: coloredChildren,
}
