import type { Meta } from '@storybook/react'
import { LineChart } from '..'

export default {
  component: LineChart,
  title: 'Components/Data Display/Chart/LineChart',
  parameters: {
    experimental: true,
  },
} as Meta

export { Playground } from './Playground.stories'
export { Time } from './Time.stories'
export { FormattedAxisAndPoints } from './FormattedAxisAndPoints.stories'
export { MultipleSeriesWithCustomLegend } from './MultipleSeriesWithCustomLegend.stories'
