import { ComponentMeta } from '@storybook/react'
import Stack from '..'

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
  title: 'Components/Container/Stack',
} as ComponentMeta<typeof Stack>

export { Playground } from './Playground'
export { Gap } from './Gap'
export { Direction } from './Direction'
export { AlignItems } from './AlignItems'
export { JustifyContent } from './JustifyContent'
export { Classname } from './Classname'
