import { coloredChildren } from './helper'
import { Template } from './Template.stories'

export const Gap = Template.bind({})

Gap.parameters = {
  docs: {
    description: {
      story:
        'prop `gap` define the spacing between each child based on `theme.space`.',
    },
  },
}

Gap.args = {
  gap: 4,
  children: coloredChildren,
}
