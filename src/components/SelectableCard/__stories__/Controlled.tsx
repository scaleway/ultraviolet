import { Story } from '@storybook/react'
import { ChangeEvent, useState } from 'react'
import SelectableCard from '..'
import Stack from '../../Stack'

export const Controlled: Story = _ => {
  const [value, onChange] = useState('label-1')

  return (
    <>
      <SelectableCard
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
