import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Slider } from '..'

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
