import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { Slider } from '..'

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
        label="Tooltip: true"
        onChange={() => {}}
        tooltip
        value={3}
      />
      <Slider
        {...args}
        double
        label="Tooltip: true (double)"
        onChange={() => {}}
        suffix={undefined}
        tooltip
        value={[5, 14]}
      />
      <Slider
        {...args}
        double={false}
        label="Custom"
        onChange={setValue}
        tooltip={label}
        value={value}
      />
      <Slider
        {...args}
        double
        label="Custom label - double"
        onChange={setValues}
        suffix={undefined}
        tooltip={labels}
        value={values}
      />
      <Slider
        {...args}
        double
        label="Single tooltip"
        onChange={setValues2}
        suffix={undefined}
        tooltip={labels2}
        tooltipPosition="bottom"
        value={values2}
      />
      <Slider
        {...args}
        label="Tooltip bottom"
        onChange={() => {}}
        tooltip
        tooltipPosition="bottom"
        value={3}
      />
    </Stack>
  )
}

Tooltip.args = { label: 'Label', max: 20, min: 1 }

Tooltip.parameters = {
  docs: {
    description: {
      story:
        'It is possible to have tooltips on slider. By default, the tooltip shows the current value but it is possible to define a custom tooltip. When defining custom tooltip for a double slider, remember to pass an array of tooltip',
    },
  },
}
