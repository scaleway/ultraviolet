import type { ComponentStory } from '@storybook/react'
import { BarStack } from '..'
import { fakeData } from './mockData'

export const Template: ComponentStory<typeof BarStack> = ({ ...props }) => (
  <BarStack {...props} data={fakeData} />
)
