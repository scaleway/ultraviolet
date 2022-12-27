import type { Story } from '@storybook/react'
import { useState } from 'react'
import SelectableCard from '..'
import Stack from '../../Stack'

export const Disabled: Story = () => {
  const [value, onChange] = useState('label-8')

  return (
    <>
      <SelectableCard
        name="label-7"
        checked={value === 'label-7'}
        value="label-7"
        type="radio"
        onChange={event => onChange(event.currentTarget.value)}
        label="Radio Left"
      />
      <SelectableCard
        name="label-8"
        checked={value === 'label-8'}
        value="label-8"
        type="radio"
        disabled
        onChange={event => onChange(event.currentTarget.value)}
        label="Radio Right"
      />
    </>
  )
}

Disabled.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
