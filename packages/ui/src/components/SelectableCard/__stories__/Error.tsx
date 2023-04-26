import type { Story } from '@storybook/react'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Stack } from '../../Stack'

export const Error: Story = () => {
  const [value, onChange] = useState('label-12')

  return (
    <>
      <SelectableCard
        name="label-12"
        checked={value === 'label-12'}
        value="label-12"
        type="radio"
        isError
        showTick
        onChange={event => onChange(event.currentTarget.value)}
        label="Radio Left"
      />
      <SelectableCard
        name="label-13"
        checked={value === 'label-13'}
        value="label-13"
        type="radio"
        showTick
        onChange={event => onChange(event.currentTarget.value)}
        label="Radio Right"
      />
    </>
  )
}

Error.parameters = {
  docs: {
    storyDescription:
      'Use `isError` prop to display SelectableCard with a error style.',
  },
}

Error.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
