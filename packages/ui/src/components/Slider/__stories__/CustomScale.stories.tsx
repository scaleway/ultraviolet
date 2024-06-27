import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Slider } from '..'
import { Stack } from '../../Stack'

const scale = [1, 2, 3, 4, 5, 10, 15, 20, 25]
const options = [
  { label: 'One', value: 0 },
  { label: '2', value: 1 },
  { label: '3', value: 2 },
  { label: 'Four', value: 3 },
  { label: '5', value: 4 },
  { label: '6?', value: 5 },
  { label: '7', value: 6 },
  { label: '20 Gps', value: 7 },
  { label: '25!', value: 8 },
]
export const CustomScale: StoryFn<typeof Slider> = args => {
  const [value, setValue] = useState(1)
  const [value2, setValue2] = useState(1)
  const [values, setValues] = useState([2, 3])

  return (
    <Stack gap={4}>
      <Slider
        {...args}
        possibleValues={scale}
        optionsUnit="Gps"
        value={value}
        onChange={setValue}
        tooltip={false}
        label="Label"
        unit="%"
      />
      Current value: {scale[value]}
      <Slider
        possibleValues={scale}
        value={values}
        double
        name="name"
        tooltip={false}
        label="Label"
        onChange={setValues}
      />
      Values: {scale[values[0]]}-{scale[values[1]]}
      <Slider
        {...args}
        possibleValues={scale}
        options={options}
        value={value2}
        onChange={setValue2}
        tooltip={false}
        label="Custom scale with custom options"
        unit="%"
      />
      Current value: {options.find(element => element.value === value2)?.label}
    </Stack>
  )
}

CustomScale.args = {
  label: 'Label',
}
CustomScale.parameters = {
  docs: {
    description: {
      story:
        'Specify `possibleValues` to set a custom scale for the slider. In this case:  \n - `min = 0` \n - `max = length(possibleValues)` \n\n - To get the correct value from the onChange get possiblesValues(value) where value is returned by onChange. See the code of this story for more details.',
    },
  },
}
