import { BarChart } from '..'

import { barChartSimpleData } from './mockData'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof BarChart> = ({ ...props }) => (
  <BarChart data={barChartSimpleData} {...props} />
)
