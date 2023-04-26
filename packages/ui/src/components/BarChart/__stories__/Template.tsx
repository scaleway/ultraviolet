import type { ComponentStory } from '@storybook/react'
import { BarChart } from '..'
import { barChartSimpleData } from './mockData'

export const Template: ComponentStory<typeof BarChart> = ({ ...props }) => (
  <BarChart data={barChartSimpleData} {...props} />
)
