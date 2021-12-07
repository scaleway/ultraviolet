import { Meta, Story } from '@storybook/react'
import { format } from 'date-fns'
import React, { ComponentProps } from 'react'
import BarChart from '..'
import {
  barChartMultiData,
  barChartPositiveNegativeData,
  barChartSimpleData,
} from './mockData'

export default {
  component: BarChart,
  title: 'Components/Data Display/Chart/BarChart',
} as Meta

const Template: Story<ComponentProps<typeof BarChart>> = args => (
  <BarChart data={barChartSimpleData} {...args} />
)

export const Default = Template.bind({})

export const FormattedValuesAndTooltip = Template.bind({})
FormattedValuesAndTooltip.decorators = [
  () => (
    <BarChart
      data={barChartSimpleData}
      axisFormatters={{
        bottom: value => format(new Date(value), 'dd-MM-Y'),
        left: value => `${value.toString()} kb`,
      }}
      tooltipFunction={({ value, indexValue, ...props }) => ({
        ...props,
        formattedValue: `${value} kb`,
        indexValue: format(new Date(indexValue), 'dd-MM-Y'),
      })}
    />
  ),
]

export const MultiSeries = Template.bind({})
MultiSeries.decorators = [
  () => (
    <BarChart
      keys={['sent', 'received']}
      data={barChartMultiData}
      axisFormatters={{
        bottom: value => format(new Date(value), 'dd-MM-Y'),
      }}
      tooltipFunction={({ value, indexValue, ...props }) => ({
        ...props,
        indexValue: format(new Date(indexValue), 'dd-MM-Y'),
      })}
    />
  ),
]

export const PositiveNegative = Template.bind({})
PositiveNegative.decorators = [
  () => (
    <BarChart
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
      tooltipFunction={({ value, indexValue, ...props }) => ({
        ...props,
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
  ),
]
