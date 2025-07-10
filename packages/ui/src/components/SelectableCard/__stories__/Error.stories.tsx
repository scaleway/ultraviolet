import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Stack } from '../../Stack'

export const Error: StoryFn = args => {
  const [value, onChange] = useState('label-12')

  return (
    <>
      <SelectableCard
        {...args}
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
        {...args}
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
    description: {
      story: 'Use `isError` prop to display SelectableCard with a error style.',
    },
  },
}

Error.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
