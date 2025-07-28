import type { StoryFn } from '@storybook/react-vite'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { SelectableCard } from '..'

export const Controlled: StoryFn = args => {
  const [value, onChange] = useState('label-1')

  return (
    <>
      <SelectableCard
        {...args}
        name="label-1"
        checked={value === 'label-1'}
        value="label-1"
        label="Left Radio"
        type="radio"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
      />
      <SelectableCard
        {...args}
        name="label-2"
        checked={value === 'label-2'}
        value="label-2"
        type="radio"
        label="Right Radio"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
      />
    </>
  )
}

Controlled.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
