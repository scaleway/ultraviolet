import type { StoryFn } from '@storybook/react'
import { CheckboxGroup } from '@ultraviolet/ui'
import { useState } from 'react'

export const Controlled: StoryFn = () => {
  const [values, onChange] = useState(['controlled-label-1'])

  return (
    <CheckboxGroup
      legend="Label"
      name="controlled"
      value={values}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (values.includes(e.currentTarget.value)) {
          const index = values.indexOf(e.currentTarget.value)
          onChange(values.splice(index, 1))
        } else {
          onChange([...values, `controlled-${e.currentTarget.value}`])
        }
      }}
    >
      <CheckboxGroup.Checkbox name="label-1" value="label-1">
        label 1
      </CheckboxGroup.Checkbox>
      <CheckboxGroup.Checkbox name="label-2" value="label-2">
        Label 2
      </CheckboxGroup.Checkbox>
    </CheckboxGroup>
  )
}

Controlled.parameters = {
  docs: {
    storyDescription:
      'CheckboxGroup only work as a controlled component. You need to pass `onChange` callback to control it.',
  },
}
