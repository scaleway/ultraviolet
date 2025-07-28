import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { UnitInput } from '..'

const optionsSelect = [
  {
    label: 'Seconds',
    value: 'seconds',
  },
  {
    label: 'Days',
    value: 'days',
  },
  {
    label: 'Months',
    value: 'months',
  },
]
export const Template: StoryFn<typeof UnitInput> = args => {
  const [value, setValue] = useState<number>()
  const [unit, setUnit] = useState<string>()

  return (
    <Stack gap={5} width="600px">
      <UnitInput
        {...args}
        onChange={val => setValue(val)}
        onChangeUnitValue={val => setUnit(val[0])}
        options={optionsSelect}
        width="300px"
      />
      Value: {value} {unit}
    </Stack>
  )
}

Template.args = {
  helper: 'Helper',
  label: 'Label',
  name: 'Hello',
  options: optionsSelect,
  placeholder: 'Placeholder',
}
