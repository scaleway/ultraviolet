import type { ComponentStory } from '@storybook/react'
import PieChart from '..'
import { data } from './mockData'

export const Template: ComponentStory<typeof PieChart> = props => (
  <PieChart data={data} {...props} />
)
