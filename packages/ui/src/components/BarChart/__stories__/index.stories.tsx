import type { Meta } from '@storybook/react'
import { BarChart } from '..'

export default {
  component: BarChart,
  title: 'Components/Data Display/Chart/BarChart',
} as Meta<typeof BarChart>

export { Playground } from './Playground.stories'
export { FormattedValuesAndTooltip } from './FormattedValuesAndTooltip.stories'
export { MultiSeries } from './MultiSeries.stories'
export { PositiveNegative } from './PositiveNegative.stories'
