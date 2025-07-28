import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { SelectableCard } from '..'

export const Tooltip: StoryFn = args => {
  const [value, onChange] = useState('label-14')

  return (
    <>
      <SelectableCard
        {...args}
        name="label-14"
        checked={value === 'label-14'}
        value="label-14"
        type="radio"
        tooltip="Click on me!"
        onChange={event => onChange(event.currentTarget.value)}
        label="Radio Left"
      />
      <SelectableCard
        {...args}
        name="label-15"
        checked={value === 'label-15'}
        value="label-15"
        type="radio"
        tooltip="No! Click on me instead!"
        onChange={event => onChange(event.currentTarget.value)}
        label="Radio Right"
      />
    </>
  )
}

Tooltip.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
