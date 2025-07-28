import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCardGroup } from '..'

export const Columns: StoryFn<typeof SelectableCardGroup> = args => {
  const [values, onChange] = useState(['value-1'])

  return (
    <SelectableCardGroup
      {...args}
      legend="3 columns"
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
      <SelectableCardGroup.Card label="Checkbox 3" value="value-3" />
      <SelectableCardGroup.Card label="Checkbox 4" value="value-4" />
      <SelectableCardGroup.Card label="Checkbox 5" value="value-5" />
      <SelectableCardGroup.Card label="Checkbox 6" value="value-6" />
    </SelectableCardGroup>
  )
}

Columns.args = {
  columns: 3,
}

Columns.parameters = {
  docs: {
    description: {
      story:
        'Use the `column` prop to change the number of columns of the group.',
    },
  },
}
