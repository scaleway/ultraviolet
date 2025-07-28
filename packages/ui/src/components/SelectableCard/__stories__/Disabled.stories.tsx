import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { SelectableCard } from '..'

export const Disabled: StoryFn = args => {
  const [value, onChange] = useState('label-8')

  return (
    <>
      <SelectableCard
        {...args}
        name="label-7"
        checked={value === 'label-7'}
        value="label-7"
        type="radio"
        onChange={event => onChange(event.currentTarget.value)}
        label="Radio Left"
      />
      <SelectableCard
        {...args}
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
