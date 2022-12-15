import type { ComponentStory } from '@storybook/react'
import { format } from 'date-fns'
import BarChart from '..'
import { barChartSimpleData } from './mockData'

export const FormattedValuesAndTooltip: ComponentStory<
  typeof BarChart
> = props => (
  <BarChart
    {...props}
    data={barChartSimpleData}
    axisFormatters={{
      bottom: value => format(new Date(value), 'dd-MM-Y'),
      left: value => `${value.toString()} kb`,
    }}
    tooltipFunction={({ value, indexValue, color }) => ({
      color,
      formattedValue: `${value} kb`,
      indexValue: format(new Date(indexValue), 'dd-MM-Y'),
    })}
  />
)

FormattedValuesAndTooltip.parameters = {
  docs: {
    storyDescription:
      'Use `axisFormatters` and `tooltipFunction` to customize the axis and tooltip.',
  },
}
