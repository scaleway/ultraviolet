import type { StoryFn } from '@storybook/react-vite'
import { useTheme } from '@ultraviolet/themes'
import { format } from 'date-fns'
import { BarChart } from '..'
import { barChartPositiveNegativeData } from './mockData'

export const PositiveNegative: StoryFn<typeof BarChart> = props => {
  const theme = useTheme()

  return (
    <BarChart
      {...props}
      axisFormatters={{
        bottom: value => format(new Date(value), 'dd-MM-Y'),
        left: value => {
          if (value === 1) {
            return 'Active'
          }
          if (value === -1) {
            return 'Inactive'
          }

          return ''
        },
      }}
      chartProps={{
        colors: ({ value }) =>
          value === 1
            ? theme.colors.other.data.charts.success
            : theme.colors.other.data.charts.danger,
        gridYValues: [-1, 0, 1],
        maxValue: 1,
        minValue: -1,
      }}
      data={barChartPositiveNegativeData}
      height={200}
      tickValues={{
        left: 10,
      }}
      tooltipFunction={({ value, indexValue, color }) => ({
        color,
        formattedValue: value === 1 ? 'Active' : 'Inactive',
        indexValue: format(new Date(indexValue), 'dd-MM-Y'),
      })}
    />
  )
}

PositiveNegative.parameters = {
  docs: {
    description: { story: 'Use `chartProps` to customize the chart.' },
  },
}
