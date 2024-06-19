import type { StoryFn } from '@storybook/react'
import { Slider } from '..'
import { Stack } from '../../Stack'

const optionsAll = [
  { label: '1 GB', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5 GB', value: 5 },
]

const options = [
  { label: '1 Gbps', value: 1 },
  { value: 3 },
  { value: 5 },
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { label: '25 Gbps', value: 25 },
]

export const Options: StoryFn<typeof Slider> = args => (
  <Stack gap={4}>
    <Slider {...args} options={optionsAll} max={5} min={1} value={3} />
    <Slider {...args} options={options} min={1} max={25} value={3} />
    <Slider
      {...args}
      options={optionsAll}
      min={1}
      max={5}
      double
      value={[3, 1]}
    />
  </Stack>
)

Options.args = { label: 'Label' }

Options.parameters = {
  docs: {
    description: {
      story:
        'Specify ticks to show using the `options` prop. This prop does *not* impact the step.',
    },
  },
}
