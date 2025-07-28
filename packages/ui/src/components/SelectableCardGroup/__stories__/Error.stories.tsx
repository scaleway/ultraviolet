import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { SelectableCardGroup } from '..'

export const Error: StoryFn<typeof SelectableCardGroup> = args => {
  const [values, onChange] = useState(['value-1'])
  const [valueRow, onChange2] = useState('radio-1')

  return (
    <Stack gap={4}>
      <SelectableCardGroup
        {...args}
        columns={1}
        legend="Error with 1 column and checkbox"
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

      <SelectableCardGroup
        {...args}
        columns={2}
        legend="Error with 2 columns and radio"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange2(event.currentTarget.value)
        }
        showTick
        type="radio"
        value={valueRow}
      >
        <SelectableCardGroup.Card label="Radio 1" value="radio-1" />
        <SelectableCardGroup.Card label="Radio 2" value="radio-2" />
      </SelectableCardGroup>
    </Stack>
  )
}

Error.args = {
  error: 'This is an error',
  legend: 'Error',
  name: 'template',
}
Error.parameters = {
  docs: {
    description: {
      story:
        'Use `error` prop to display SelectableCardGroup with a error style.',
    },
  },
}
