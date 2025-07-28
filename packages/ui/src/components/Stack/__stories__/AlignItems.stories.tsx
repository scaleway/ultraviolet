import { coloredChildren } from './helper'
import { Template } from './Template.stories'

export const AlignItems = Template.bind({})

AlignItems.parameters = {
  docs: {
    description: {
      story:
        'The prop `alignItems` supports every value of css property `align-items`',
    },
  },
}

AlignItems.args = {
  alignItems: 'center',
  children: coloredChildren,
  gap: 2,
}
