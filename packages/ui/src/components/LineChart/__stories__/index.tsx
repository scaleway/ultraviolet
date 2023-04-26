import type { Meta } from '@storybook/react'
import { LineChart } from '..'

export default {
  component: LineChart,
  title: 'Components/Data Display/Chart/LineChart',
  parameters: {
    experimental: true,
  },
} as Meta

export { Playground } from './Playground'
export { Time } from './Time'
export { FormattedAxisAndPoints } from './FormattedAxisAndPoints'
export { MultipleSeriesWithCustomLegend } from './MultipleSeriesWithCustomLegend'
