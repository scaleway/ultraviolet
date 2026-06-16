import type { Meta } from '@storybook/react-vite'
import { LineChart } from '..'

export default {
  component: LineChart,
  title: 'UI/Data Display/Chart/LineChart',
  parameters: {
    a11y: false,
    a11yStatus: {
      perceivable: false,
      operable: false,
      understandable: false,
      robust: false,
    },
    experimental: true,
  },
  tags: ['experimental'],
} as Meta

export { Playground } from './Playground.stories'
export { Time } from './Time.stories'
export { FormattedAxisAndPoints } from './FormattedAxisAndPoints.stories'
export { MultipleSeriesWithCustomLegend } from './MultipleSeriesWithCustomLegend.stories'
export { CustomTooltip } from './CustomTooltip.stories'
