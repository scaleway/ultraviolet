import { Template } from './Template.stories'
import { coloredChildren } from './helper'

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
