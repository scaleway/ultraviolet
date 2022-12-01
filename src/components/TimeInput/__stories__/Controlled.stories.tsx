import { Story } from '@storybook/react'
import { useState } from 'react'
import TimeInput from '..'
import { SelectOption } from '../../RichSelect'

export const Controlled: Story = ({
  value: defaultValue = { label: '03:30', value: '03:30' },
}) => {
  const [value, setValue] = useState<SelectOption>(defaultValue as SelectOption)

  return (
    <TimeInput
      name="timeinput-test-controlled"
      onChange={setValue}
      placeholder="Time"
      value={value}
    />
  )
}

Controlled.parameters = {
  docs: {
    storyDescription:
      'Most of the time, you need a [controlled component](https://reactjs.org/docs/forms.html).',
  },
}
