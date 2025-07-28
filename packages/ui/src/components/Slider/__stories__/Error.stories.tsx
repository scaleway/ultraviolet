import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Slider } from '..'

export const Error: StoryFn<typeof Slider> = args => (
  <Stack gap={4}>
    <Slider
      {...args}
      error
      label="Error"
      onChange={() => {}}
      tooltip="Disabled"
      value={75}
    />
    <Slider
      {...args}
      error="This field is required"
      label="Error message"
      onChange={() => {}}
      tooltip={false}
      value={0}
    />
    <Slider
      double
      error="Something occured"
      label="Error message"
      name="Name"
      onChange={() => {}}
      tooltip={false}
      value={[13, 75]}
    />
  </Stack>
)
