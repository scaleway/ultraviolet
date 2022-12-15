import type { ComponentMeta } from '@storybook/react'
import TooltipIcon from '..'

export default {
  component: TooltipIcon,
  parameters: {
    docs: {
      description: {
        component: 'An icon with tooltip when hovered.',
      },
    },
  },
  title: 'Components/Feedback/TooltipIcon',
} as ComponentMeta<typeof TooltipIcon>

export { Playground } from './Playground.stories'
export { Colors } from './Colors.stories'
export { Sizes } from './Sizes.stories'
