import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Slider } from '..'
import { Stack } from '../../Stack'

export const Tooltip: StoryFn<typeof Slider> = args => {
  const [value, setValue] = useState<number>(3)
  const [values, setValues] = useState<number[]>([2, 4])
  const labels = [`Current min: ${values[0]}`, `Current max: ${values[1]}`]
  const label = `Current value: ${value}`
  const onChangeSingle = (val: number) => setValue(val)

  return (
    <Stack gap={4}>
      <Slider {...args} value={3} label="Default" onChange={() => {}} />
      <Slider
        {...args}
        value={[5, 14]}
        label="Default double"
        double
        onChange={() => {}}
      />
      <Slider
        {...args}
        value={value}
        label="Custom"
        labelTooltip={label}
        onChange={onChangeSingle}
        double={false}
      />
      <Slider
        {...args}
        value={values}
        double
        label="Custom label - double"
        labelTooltip={labels}
        onChange={setValues}
      />
    </Stack>
  )
}

Tooltip.args = { min: 1, max: 20, labelTooltip: true, label: 'Label' }

Tooltip.parameters = {
  docs: {
    description: {
      story:
        'It is possible to have tooltips on slider. By default, the tooltip shows the current value but it is possible to define a custom tooltip. When defining custom tooltip for a double slider, remember to pass an array of tooltip',
    },
  },
}
