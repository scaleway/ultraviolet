import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { UnitInput } from '..'
import { Stack } from '../../Stack'

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
    <Stack width="600px" gap={5}>
      <UnitInput
        {...args}
        options={optionsSelect}
        onChange={val => setValue(val)}
        onChangeUnitValue={val => setUnit(val[0])}
        width="300px"
      />
      Value: {value} {unit}
    </Stack>
  )
}

Template.args = {
  name: 'Hello',
  options: optionsSelect,
  helper: 'Helper',
  placeholder: 'Placeholder',
  label: 'Label',
}
