import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCardGroup } from '..'

export const Template: StoryFn<typeof SelectableCardGroup> = args => {
  const [value, onChange] = useState('value-1')

  return (
    <SelectableCardGroup
      {...args}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(event.currentTarget.value)
      }
    >
      <SelectableCardGroup.Card value="value-1" label="Radio 1" />
      <SelectableCardGroup.Card value="value-2" label="Radio 2" />
    </SelectableCardGroup>
  )
}

Template.args = {
  name: 'template',
  legend: 'Radio',
  helper: 'Helper content for the group',
}
