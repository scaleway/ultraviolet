import { LineChart } from '..'

import { lineChartData } from './mockData'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof LineChart> = args => (
  <LineChart data={lineChartData} {...args} />
)
