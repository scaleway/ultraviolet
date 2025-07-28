import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { SelectableCard } from '..'

export const Error: StoryFn = args => {
  const [value, onChange] = useState('label-12')

  return (
    <>
      <SelectableCard
        {...args}
        checked={value === 'label-12'}
        isError
        label="Radio Left"
        name="label-12"
        onChange={event => onChange(event.currentTarget.value)}
        showTick
        type="radio"
        value="label-12"
      />
      <SelectableCard
        {...args}
        checked={value === 'label-13'}
        label="Radio Right"
        name="label-13"
        onChange={event => onChange(event.currentTarget.value)}
        showTick
        type="radio"
        value="label-13"
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
