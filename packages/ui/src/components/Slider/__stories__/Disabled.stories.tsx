import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { Slider } from '..'

export const Disabled: StoryFn<typeof Slider> = () => (
  <Stack gap={4}>
    <Slider
      disabled
      label="Disabled with tooltip"
      name="name"
      tooltip="Disabled"
      value={75}
    />
    <Slider
      disabled
      double
      label="Disabled double"
      name="name"
      value={[10, 40]}
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
