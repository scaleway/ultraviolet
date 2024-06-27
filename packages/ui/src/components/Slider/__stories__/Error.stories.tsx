import type { StoryFn } from '@storybook/react'
import { Slider } from '..'
import { Stack } from '../../Stack'

export const Error: StoryFn<typeof Slider> = args => (
  <Stack gap={4}>
    <Slider
      {...args}
      value={75}
      tooltip="Disabled"
      label="Error"
      error
      onChange={() => {}}
    />
    <Slider
      name="slider"
      data-testid="slider"
      value={1}
      input
      double={false}
      onChange={(value: number) => console.log(value)}
    />
    <Slider
      {...args}
      value={0}
      label="Error message"
      error="This field is required"
      onChange={() => {}}
      tooltip={false}
    />
    <Slider
      name="Name"
      value={[13, 75]}
      label="Error message"
      error="Something occured"
      double
      onChange={() => {}}
      tooltip={false}
    />
  </Stack>
)
