import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { CheckboxGroup } from '..'

export const Controlled: StoryFn = () => {
  const [values, onChange] = useState(['label-1'])

  return (
    <CheckboxGroup
      label="Legend label"
      name="controlled"
      value={values}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const data = [...values]
        if (data.includes(e.currentTarget.value)) {
          data.splice(data.indexOf(e.currentTarget?.value), 1)
        } else {
          data.push(e.currentTarget.value)
        }
        onChange(data)
      }}
    >
      <CheckboxGroup.Checkbox name="label-1" value="label-1">
        label 1
      </CheckboxGroup.Checkbox>
      <CheckboxGroup.Checkbox name="label-2" value="label-2">
        Label 2
      </CheckboxGroup.Checkbox>
      {JSON.stringify(values, null, 4)}
    </CheckboxGroup>
  )
}

Controlled.parameters = {
  docs: {
    storyDescription:
      'CheckboxGroup only work as a controlled component. You need to pass `onChange` callback to control it.',
  },
}
