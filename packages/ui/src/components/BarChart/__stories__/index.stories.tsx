import { BarChart } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: BarChart,
  title: 'UI/Data Display/Chart/BarChart',
  parameters: {
    a11y: 'partial',
  },
} as Meta<typeof BarChart>

export { Playground } from './Playground.stories'
export { FormattedValuesAndTooltip } from './FormattedValuesAndTooltip.stories'
export { MultiSeries } from './MultiSeries.stories'
export { PositiveNegative } from './PositiveNegative.stories'
export { Label } from './Label.stories'
