import type { ComponentMeta } from '@storybook/react'
import { PieChart } from '..'

export default {
  component: PieChart,
  decorators: [StoryComponent => <StoryComponent />],
  title: 'Components/Data Display/Chart/PieChart',
  parameters: {
    experimental: true,
  },
} as ComponentMeta<typeof PieChart>

export { Playground } from './Playground'
export { Content } from './Content'
export { Legends } from './Legends'
export { PopperDetails } from './PopperDetails'
export { EmptyLegend } from './EmptyLegend'
export { Strikethrough } from './Strikethrough'
