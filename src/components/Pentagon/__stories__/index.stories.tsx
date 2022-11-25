import { ComponentMeta } from '@storybook/react'
import Pentagon from '..'

export default {
  component: Pentagon,
  parameters: {
    docs: {
      description: {
        component: 'Simple pentagon with different sizes and colors.',
      },
    },
  },
  title: 'Components/Data Display/Pentagon',
} as ComponentMeta<typeof Pentagon>

export { Playground } from './Playground.stories'
export { Color } from './Color.stories'
export { Size } from './Size.stories'
