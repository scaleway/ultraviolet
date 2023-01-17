import type { ComponentMeta } from '@storybook/react'
import { Stack } from '..'

export default {
  component: Stack,
  parameters: {
    docs: {
      description: {
        component:
          'A Stack is a widget that organize children in a vertical or horizontal layout based on css Flex, it accepts fews props to deal with spacing and align.',
      },
    },
  },
  title: 'Components/Layout/Stack',
} as ComponentMeta<typeof Stack>

export { Playground } from './Playground.stories'
export { Gap } from './Gap.stories'
export { Direction } from './Direction.stories'
export { AlignItems } from './AlignItems.stories'
export { JustifyContent } from './JustifyContent.stories'
