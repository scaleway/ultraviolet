import { Meta, Story } from '@storybook/react'
import React from 'react'
import PieChart, { PieChartProps } from '..'
import {
  data,
  dataWithLegends,
  dataWithLegendsAndDetails,
  dataWithLegendsDetailsAndDiscount,
} from './mockData'

export default {
  component: PieChart,
  title: 'Components/Data Display/Chart/PieChart',
} as Meta

const Template: Story<PieChartProps> = () => <PieChart data={data} />

export const Default = Template.bind({})

export const Content = Template.bind({})
Content.decorators = [() => <PieChart data={data} content="€20" />]

export const Legends = Template.bind({})
Legends.decorators = [
  () => <PieChart data={dataWithLegends} content="€20" withLegend />,
]

export const PopperDetails = Template.bind({})
PopperDetails.decorators = [
  () => <PieChart data={dataWithLegendsAndDetails} content="€20" withLegend />,
]

export const EmptyLegend = Template.bind({})
EmptyLegend.decorators = [
  () => <PieChart emptyLegend="I'm alone in the dark" withLegend />,
]

export const Strikethrough = Template.bind({})
Strikethrough.decorators = [
  () => (
    <PieChart
      withLegend
      data={dataWithLegendsDetailsAndDiscount}
      content="€0"
    />
  ),
]
