import type { Meta } from '@storybook/react-vite'
import { LineChart } from '..'

export default {
  component: LineChart,
  parameters: {
    experimental: true,
  },
  tags: ['experimental'],
  title: 'Components/Data Display/Chart/LineChart',
} as Meta

export { FormattedAxisAndPoints } from './FormattedAxisAndPoints.stories'
export { MultipleSeriesWithCustomLegend } from './MultipleSeriesWithCustomLegend.stories'
export { Playground } from './Playground.stories'
export { Time } from './Time.stories'
