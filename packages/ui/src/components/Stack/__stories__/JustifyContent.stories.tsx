import { coloredChildren } from './helper'
import { Template } from './Template.stories'

export const JustifyContent = Template.bind({})

JustifyContent.parameters = {
  docs: {
    description: {
      story:
        'prop `justifyContent` support every value of css property `justify-content`',
    },
  },
}

JustifyContent.args = {
  children: coloredChildren,
  direction: 'row',
  justifyContent: 'space-between',
}
