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
        checked={value === 'label-1'}
        label="Left Radio"
        name="label-1"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
        type="radio"
        value="label-1"
      />
      <SelectableCard
        {...args}
        checked={value === 'label-2'}
        label="Right Radio"
        name="label-2"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.currentTarget.value)
        }
        type="radio"
        value="label-2"
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
