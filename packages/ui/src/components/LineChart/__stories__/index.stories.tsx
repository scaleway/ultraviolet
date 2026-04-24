import { LineChart } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: LineChart,
  title: 'UI/Data Display/Chart/LineChart',
  parameters: {
    a11y: false,
    audit: {
      'keyboard-focus': false,
      'contrast-visuals': false,
      'semantics-screen-reader': false,
      'pointer-touch': false,
      'specific-patterns': false,
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
