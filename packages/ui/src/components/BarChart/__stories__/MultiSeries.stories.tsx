import type { ComponentStory } from '@storybook/react'
import { format } from 'date-fns'
import BarChart from '..'
import { barChartMultiData } from './mockData'

export const MultiSeries: ComponentStory<typeof BarChart> = props => (
  <BarChart
    {...props}
    keys={['sent', 'received']}
    data={barChartMultiData}
    axisFormatters={{
      bottom: value => format(new Date(value), 'dd-MM-Y'),
    }}
    tooltipFunction={({ value, indexValue, color }) => ({
      color,
      formattedValue: `${value}`,
      indexValue: format(new Date(indexValue), 'dd-MM-Y'),
    })}
  />
)

MultiSeries.parameters = {
  docs: {
    storyDescription:
      'You can specify multiple `keys` to render multiple series at once.',
  },
}
