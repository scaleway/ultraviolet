import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Slider } from '..'

export const Disabled: StoryFn<typeof Slider> = () => (
  <Stack gap={4}>
    <Slider
      value={75}
      disabled
      tooltip="Disabled"
      label="Disabled with tooltip"
      name="name"
    />
    <Slider
      value={[10, 40]}
      disabled
      label="Disabled double"
      double
      name="name"
    />
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
