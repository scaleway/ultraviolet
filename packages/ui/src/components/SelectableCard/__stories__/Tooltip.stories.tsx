import type { Story } from '@storybook/react'
import { useState } from 'react'
import SelectableCard from '..'
import Stack from '../../Stack'

export const Tooltip: Story = () => {
  const [value, onChange] = useState('label-14')

  return (
    <>
      <SelectableCard
        name="label-14"
        checked={value === 'label-14'}
        value="label-14"
        type="radio"
        tooltip="Click on me!"
        onChange={event => onChange(event.currentTarget.value)}
        label="Radio Left"
      />
      <SelectableCard
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
