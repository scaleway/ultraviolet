import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Slider } from '..'
import { Stack } from '../../Stack'

const options = [
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3$', value: 3 },
  { label: 'Four', value: 4 },
  { label: '5', value: 5 },
  { label: '6?', value: 6 },
  { label: 'Seven', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10!', value: 10 },
]

export const Options: StoryFn<typeof Slider> = args => {
  const [value, setValue] = useState(30)

  return (
    <Stack gap={4}>
      <Slider
        {...args}
        options
        optionsUnit="%"
        max={100}
        min={0}
        value={value}
        onChange={setValue}
        tooltip={false}
        label="Default options with unit and option unit"
        unit="%"
        step={10}
      />
      Current value: {value}
      <Slider
        options
        min={0}
        max={5}
        value={[3, 1]}
        double
        name="name"
        tooltip={false}
        label="Default options double"
      />
      <Slider
        {...args}
        options={options}
        min={0}
        max={10}
        value={3}
        onChange={() => {}}
        tooltip={false}
        label="Custom options"
      />
      <Slider
        options={options}
        min={0}
        max={10}
        value={[1, 4]}
        double
        name="name"
        tooltip={false}
        label="Custom options double"
      />
    </Stack>
  )
}

Options.args = {
  label: 'Label',
}
Options.parameters = {
  docs: {
    description: {
      story:
        'Specify ticks to show using the `options` prop. This prop does *not* impact the step: use instead prop `possibleValues`. \n Default options will add ticks to every single value, taking into account the step. With prop `optionsUnit` it is possible to add unit to the first and last value.',
    },
  },
}
