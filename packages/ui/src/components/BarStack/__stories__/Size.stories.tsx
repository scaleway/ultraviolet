import { BarStack } from '..'
import { Stack } from '../../Stack'

import { fakeData } from './mockData'

import type { StoryFn } from '@storybook/react-vite'

export const Size: StoryFn<typeof BarStack> = ({ ...props }) => (
  <Stack direction="column" gap={2}>
    <BarStack {...props} data={fakeData} label="xsmall" size="xsmall" />
    <BarStack {...props} data={fakeData} label="small" size="small" />
    <BarStack
      {...props}
      data={fakeData}
      label="medium (default)"
      size="medium"
    />
    <BarStack {...props} data={fakeData} label="large" size="large" />
  </Stack>
)
