import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCardGroup } from '..'
import { Stack } from '../../Stack'

export const Error: StoryFn<typeof SelectableCardGroup> = args => {
  const [values, onChange] = useState(['value-1'])
  const [valueRow, onChange2] = useState('radio-1')

  return (
    <Stack gap={4}>
      <SelectableCardGroup
        {...args}
        legend="Error with 1 column and checkbox"
        value={values}
        columns={1}
        showTick
        type="checkbox"
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

      <SelectableCardGroup
        {...args}
        legend="Error with 2 columns and radio"
        columns={2}
        value={valueRow}
        showTick
        type="radio"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange2(event.currentTarget.value)
        }
      >
        <SelectableCardGroup.Card value="radio-1" label="Radio 1" />
        <SelectableCardGroup.Card value="radio-2" label="Radio 2" />
      </SelectableCardGroup>
    </Stack>
  )
}

Error.args = {
  name: 'template',
  legend: 'Error',
  error: 'This is an error',
}
Error.parameters = {
  docs: {
    description: {
      story:
        'Use `error` prop to display SelectableCardGroup with a error style.',
    },
  },
}
