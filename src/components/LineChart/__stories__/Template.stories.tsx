import { ComponentStory } from '@storybook/react'
import LineChart from '..'
import { lineChartData } from './mockData'

export const Template: ComponentStory<typeof LineChart> = args => (
  <LineChart data={lineChartData} {...args} />
)
