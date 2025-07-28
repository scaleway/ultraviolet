import type { Meta } from '@storybook/react-vite'
import { BarChart } from '..'

export default {
  component: BarChart,
  title: 'Components/Data Display/Chart/BarChart',
} as Meta<typeof BarChart>

export { FormattedValuesAndTooltip } from './FormattedValuesAndTooltip.stories'
export { Label } from './Label.stories'
export { MultiSeries } from './MultiSeries.stories'
export { Playground } from './Playground.stories'
export { PositiveNegative } from './PositiveNegative.stories'
