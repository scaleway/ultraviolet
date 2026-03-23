import { BarStack } from '..'

import { fakeData } from './mockData'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof BarStack> = ({ ...props }) => (
  <BarStack {...props} data={fakeData} />
)
