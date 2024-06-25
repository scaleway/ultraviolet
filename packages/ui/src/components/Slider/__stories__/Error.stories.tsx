import type { StoryFn } from '@storybook/react'
import { Slider } from '..'
import { Stack } from '../../Stack'

export const Error: StoryFn<typeof Slider> = args => (
  <Stack gap={4}>
    <Slider
      {...args}
      value={75}
      labelTooltip="Disabled"
      label="Error"
      error
      onChange={() => {}}
    />
    <Slider
      {...args}
      value={0}
      label="Error message"
      error="This field is required"
      onChange={() => {}}
    />
    <Slider
      {...args}
      value={[13, 75]}
      label="Error message"
      error="Something occured"
      double
      onChange={() => {}}
    />
  </Stack>
)
