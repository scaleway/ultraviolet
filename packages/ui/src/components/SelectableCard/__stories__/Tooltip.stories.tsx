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
        checked={value === 'label-14'}
        label="Radio Left"
        name="label-14"
        onChange={event => onChange(event.currentTarget.value)}
        tooltip="Click on me!"
        type="radio"
        value="label-14"
      />
      <SelectableCard
        {...args}
        checked={value === 'label-15'}
        label="Radio Right"
        name="label-15"
        onChange={event => onChange(event.currentTarget.value)}
        tooltip="No! Click on me instead!"
        type="radio"
        value="label-15"
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
