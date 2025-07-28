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
        checked={value === 'label-7'}
        label="Radio Left"
        name="label-7"
        onChange={event => onChange(event.currentTarget.value)}
        type="radio"
        value="label-7"
      />
      <SelectableCard
        {...args}
        checked={value === 'label-8'}
        disabled
        label="Radio Right"
        name="label-8"
        onChange={event => onChange(event.currentTarget.value)}
        type="radio"
        value="label-8"
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
