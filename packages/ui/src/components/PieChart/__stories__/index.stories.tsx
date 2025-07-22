import type { Meta } from '@storybook/react-vite'
import { PieChart } from '..'

export default {
  component: PieChart,
  title: 'Components/Data Display/Chart/PieChart',
  parameters: {
    experimental: true,
  },
  tags: ['experimental'],
} as Meta<typeof PieChart>

export { Playground } from './Playground.stories'
export { Content } from './Content.stories'
export { Legends } from './Legends.stories'
export { PopperDetails } from './PopperDetails.stories'
export { EmptyLegend } from './EmptyLegend.stories'
