import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCardGroup } from '..'

export const Template: StoryFn<typeof SelectableCardGroup> = args => {
  const [value, onChange] = useState('value-1')

  return (
    <SelectableCardGroup
      {...args}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(event.currentTarget.value)
      }
      value={value}
    >
      <SelectableCardGroup.Card label="Radio 1" value="value-1" />
      <SelectableCardGroup.Card label="Radio 2" value="value-2" />
    </SelectableCardGroup>
  )
}

Template.args = {
  helper: 'Helper content for the group',
  legend: 'Radio',
  name: 'template',
}
