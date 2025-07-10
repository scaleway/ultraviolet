import type { StoryFn } from '@storybook/react-vite'
import { LineChart } from '..'
import { lineChartData } from './mockData'

export const Template: StoryFn<typeof LineChart> = args => (
  <LineChart data={lineChartData} {...args} />
)
