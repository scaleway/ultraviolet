import { Template } from './Template.stories'
import { coloredChildren } from './helper'

export const Gap = Template.bind({})

Gap.parameters = {
  docs: {
    storyDescription:
      'prop `Gap` define the spacing between each child based on theme.space. Default value : 0/none',
  },
}

Gap.args = {
  gap: 4,
  children: coloredChildren,
}
