import type { StoryFn } from '@storybook/react'
import { BarStack } from '..'
import { fakeData } from './mockData'

export const Template: StoryFn<typeof BarStack> = ({ ...props }) => (
  <BarStack {...props} data={fakeData} />
)
