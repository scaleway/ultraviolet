import type { StoryFn } from '@storybook/react'
import { Slider } from '..'
import { Stack } from '../../Stack'

export const Disabled: StoryFn<typeof Slider> = args => (
  <Stack gap={4}>
    <Slider
      {...args}
      value={75}
      disabled
      labelTooltip="Disabled"
      label="Disabled with tooltip"
    />
    <Slider {...args} value={[10, 40]} disabled label="Disabled double" />
  </Stack>
)

Disabled.args = { value: 3 }

Disabled.parameters = {
  docs: {
    description: {
      story: 'It is possible to set a tooltip on disabled sliders.',
    },
  },
}
