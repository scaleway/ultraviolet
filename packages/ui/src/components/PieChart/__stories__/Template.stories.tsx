import { PieChart } from '..'

import { data } from './mockData'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof PieChart> = props => (
  <PieChart data={data} {...props} />
)
