import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { BarStack } from '..'
import { fakeData } from './mockData'

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
