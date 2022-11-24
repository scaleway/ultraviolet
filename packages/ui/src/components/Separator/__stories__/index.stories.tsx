import { Meta } from '@storybook/react'
import Separator from '..'

export default {
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: 'A horizontal or vertical separator.',
      },
    },
  },
  title: 'Components/Data Display/Separator',
} as Meta

export { Playground } from './Playground.stories'
export { Thickness } from './Thickness.stories'
export { Direction } from './Direction.stories'
export { Color } from './Color.stories'
export { Icon } from './Icon.stories'
