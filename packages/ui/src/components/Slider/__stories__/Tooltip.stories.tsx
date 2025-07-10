import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Slider } from '..'
import { Stack } from '../../Stack'

export const Tooltip: StoryFn<typeof Slider> = args => {
  const [value, setValue] = useState(3)
  const [values, setValues] = useState([2, 4])
  const [values2, setValues2] = useState([2, 4])
  const labels = [`Current min: ${values[0]}`, `Current max: ${values[1]}`]
  const label = `Current value: ${value}`
  const labels2 = `${values2[0]} MB - ${values2[1]} MB`

  return (
    <Stack gap={4}>
      <Slider
        {...args}
        value={3}
        label="Tooltip: true"
        onChange={() => {}}
        tooltip
      />
      <Slider
        {...args}
        double
        value={[5, 14]}
        label="Tooltip: true (double)"
        onChange={() => {}}
        tooltip
        suffix={undefined}
      />
      <Slider
        {...args}
        value={value}
        label="Custom"
        tooltip={label}
        onChange={setValue}
        double={false}
      />
      <Slider
        {...args}
        value={values}
        double
        label="Custom label - double"
        tooltip={labels}
        onChange={setValues}
        suffix={undefined}
      />
      <Slider
        {...args}
        value={values2}
        double
        label="Single tooltip"
        tooltip={labels2}
        onChange={setValues2}
        suffix={undefined}
        tooltipPosition="bottom"
      />
      <Slider
        {...args}
        value={3}
        label="Tooltip bottom"
        onChange={() => {}}
        tooltipPosition="bottom"
        tooltip
      />
    </Stack>
  )
}

Tooltip.args = { min: 1, max: 20, label: 'Label' }

Tooltip.parameters = {
  docs: {
    description: {
      story:
        'It is possible to have tooltips on slider. By default, the tooltip shows the current value but it is possible to define a custom tooltip. When defining custom tooltip for a double slider, remember to pass an array of tooltip',
    },
  },
}
