import type { Meta } from '@storybook/react-vite'
import { PieChart } from '..'

export default {
  component: PieChart,
  title: 'UI/Data Display/Chart/PieChart',
  parameters: {
    a11y: false,
    a11yStatus: {
      perceivable: undefined,
      operable: undefined,
      understandable: undefined,
      robust: undefined,
    },
    experimental: true,
  },
  tags: ['experimental'],
} as Meta<typeof PieChart>

export { Playground } from './Playground.stories'
export { Content } from './Content.stories'
export { Legends } from './Legends.stories'
export { PopperDetails } from './PopperDetails.stories'
export { EmptyLegend } from './EmptyLegend.stories'
