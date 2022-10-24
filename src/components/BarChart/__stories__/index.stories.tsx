import { ComponentMeta } from '@storybook/react'
import BarChart from '..'

export default {
  component: BarChart,
  parameters: {
    docs: {
      description: {
        component: 'BarChart is a chart component that renders bars.',
      },
    },
  },
  title: 'Components/Data Display/Chart/BarChart',
} as ComponentMeta<typeof BarChart>

export { Playground } from './Playground.stories'
export { FormattedValuesAndTooltip } from './FormattedValuesAndTooltip.stories'
export { MultiSeries } from './MultiSeries.stories'
export { PositiveNegative } from './PositiveNegative.stories'
