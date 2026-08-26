import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCardGroup } from '..'

export const Checkbox: StoryFn<typeof SelectableCardGroup> = args => {
  const [values, onChange] = useState(['value-1'])

  return (
    <SelectableCardGroup
      {...args}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const data = [...values]
        if (data.includes(event.currentTarget.value)) {
          data.splice(data.indexOf(event.currentTarget?.value), 1)
        } else {
          data.push(event.currentTarget.value)
        }
        onChange(data)
      }}
      showTick
      type="checkbox"
      value={values}
    >
      <SelectableCardGroup.Card label="Checkbox 1" value="value-1" />
      <SelectableCardGroup.Card label="Checkbox 2" value="value-2" />
    </SelectableCardGroup>
  )
}

Checkbox.args = {
  legend: 'Checkbox',
  name: 'template',
  required: true,
}
