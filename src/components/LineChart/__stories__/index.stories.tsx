import { Meta, Story } from '@storybook/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns'
import React from 'react'
import LineChart, { LineChartProps } from '..'
import {
  lineChartData,
  lineChartHoursData,
  lineChartMultipleData,
} from './mockData'

export default {
  component: LineChart,
  title: 'Components/Data Display/Chart/LineChart',
} as Meta

const Template: Story<LineChartProps> = () => (
  <LineChart data={lineChartData} xScale={{ type: 'linear' }} />
)

export const Default = Template.bind({})

export const Time = Template.bind({})
Time.decorators = [
  () => (
    <LineChart
      data={lineChartHoursData}
      axisFormatters={{
        bottom: value => format(new Date(value), 'dd-MM-y'),
      }}
    />
  ),
]

export const FormattedAxisAndPoints = Template.bind({})
FormattedAxisAndPoints.decorators = [
  () => (
    <LineChart
      data={lineChartHoursData}
      axisFormatters={{
        bottom: value => format(new Date(value), 'dd-MM'),
        left: value => `${value.toString()} liters`,
      }}
      pointFormatters={{
        x: value => format(new Date(value), 'dd-MM-y hh:mm'),
        y: value => `${value.toString()} liters`,
      }}
    />
  ),
]

export const MultipleSeriesWithCustomLegend = Template.bind({})
MultipleSeriesWithCustomLegend.decorators = [
  () => (
    <LineChart
      data={lineChartMultipleData}
      axisFormatters={{
        bottom: value => format(new Date(value), 'dd-MM-y'),
      }}
      withLegend
    />
  ),
]
