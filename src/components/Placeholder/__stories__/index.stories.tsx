import { ComponentMeta } from '@storybook/react'
import Placeholder from '..'

export default {
  component: Placeholder,
  decorators: [StoryComponent => <StoryComponent />],
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder will display empty blocks with animation. It can be used for loading screen or loading components. In terms of accessibility, do not forget to add aria-live and aria-busy true/false to the placeholder container.',
      },
    },
  },
  title: 'Components/Data Display/Placeholder',
} as ComponentMeta<typeof Placeholder>

export { Playground } from './Playground.stories'
export { Block } from './Block.stories'
export { Blocks } from './Blocks.stories'
export { Box } from './Box.stories'
export { Donut } from './Donut.stories'
export { Line } from './Line.stories'
export { Slider } from './Slider.stories'
export { List } from './List.stories'
