import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCardGroup } from '..'

export const Columns: StoryFn<typeof SelectableCardGroup> = args => {
  const [values, onChange] = useState(['value-1'])

  return (
    <SelectableCardGroup
      {...args}
      legend="3 columns"
      value={values}
      type="checkbox"
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
      <SelectableCardGroup.Card value="value-3" label="Checkbox 3" />
      <SelectableCardGroup.Card value="value-4" label="Checkbox 4" />
      <SelectableCardGroup.Card value="value-5" label="Checkbox 5" />
      <SelectableCardGroup.Card value="value-6" label="Checkbox 6" />
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
