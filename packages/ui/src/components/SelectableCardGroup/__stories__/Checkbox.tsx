import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCardGroup } from '..'

export const Checkbox: StoryFn<typeof SelectableCardGroup> = args => {
  const [values, onChange] = useState(['value-1'])

  return (
    <SelectableCardGroup
      {...args}
      type="checkbox"
      value={values}
      showTick
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const data = [...values]
        if (data.includes(event.currentTarget.value)) {
          data.splice(data.indexOf(event.currentTarget?.value), 1)
        } else {
          data.push(event.currentTarget.value)
        }
        onChange(data)
      }}
    >
      <SelectableCardGroup.Card value="value-1" label="Checkbox 1" />
      <SelectableCardGroup.Card value="value-2" label="Checkbox 2" />
    </SelectableCardGroup>
  )
}

Checkbox.args = {
  name: 'template',
  legend: 'Checkbox',
  required: true,
}
