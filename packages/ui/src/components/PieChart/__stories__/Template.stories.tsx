import type { StoryFn } from '@storybook/react-vite'
import { PieChart } from '..'
import { data } from './mockData'

export const Template: StoryFn<typeof PieChart> = props => (
  <PieChart data={data} {...props} />
)
