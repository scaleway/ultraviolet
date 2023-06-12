import type { StoryFn } from '@storybook/react'
import { PieChart } from '..'
import { data } from './mockData'

export const Template: StoryFn<typeof PieChart> = props => (
  <PieChart data={data} {...props} />
)
