import { ComponentMeta } from '@storybook/react'
import Sphere from '..'

export default {
  component: Sphere,
  parameters: {
    docs: {
      description: {
        component: 'Circle filled with color and, or text.',
      },
    },
  },
  title: 'Components/Sphere',
} as ComponentMeta<typeof Sphere>

export { Playground } from './Playground.stories'
export { Halved } from './Halved.stories'
export { Text } from './Text.stories'
