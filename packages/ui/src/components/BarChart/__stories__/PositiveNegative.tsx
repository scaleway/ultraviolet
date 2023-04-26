import type { ComponentStory } from '@storybook/react'
import { format } from 'date-fns'
import { BarChart } from '..'
import { barChartPositiveNegativeData } from './mockData'

export const PositiveNegative: ComponentStory<typeof BarChart> = props => (
  <BarChart
    {...props}
    height={200}
    data={barChartPositiveNegativeData}
    axisFormatters={{
      bottom: value => format(new Date(value), 'dd-MM-Y'),
      left: value => {
        if (value === 1) return 'Active'
        if (value === -1) return 'Inactive'

        return ''
      },
    }}
    tooltipFunction={({ value, indexValue, color }) => ({
      color,
      formattedValue: value === 1 ? 'Active' : 'Inactive',
      indexValue: format(new Date(indexValue), 'dd-MM-Y'),
    })}
    tickValues={{
      left: 10,
    }}
    chartProps={{
      colors: ({ value }) => (value === 1 ? 'green' : 'red'),
      gridYValues: [-1, 0, 1],
      maxValue: 1,
      minValue: -1,
    }}
  />
)

PositiveNegative.parameters = {
  docs: {
    storyDescription: 'Use `chartProps` to customize the chart.',
  },
}
