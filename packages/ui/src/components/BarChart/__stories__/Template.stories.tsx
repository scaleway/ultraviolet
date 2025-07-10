import type { StoryFn } from '@storybook/react-vite'
import { BarChart } from '..'
import { barChartSimpleData } from './mockData'

export const Template: StoryFn<typeof BarChart> = ({ ...props }) => (
  <BarChart data={barChartSimpleData} {...props} />
)
