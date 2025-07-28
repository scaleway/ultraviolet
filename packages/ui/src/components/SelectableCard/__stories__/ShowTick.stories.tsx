import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { SelectableCard } from '..'

export const ShowTick: StoryFn = args => {
  const [value, onChange] = useState('label-5')
  const [value2, onChange2] = useState({ 'label-1': true, 'label-2': true })

  return (
    <>
      <Stack direction="row" gap={2}>
        <SelectableCard
          {...args}
          name="label-5"
          checked={value === 'label-5'}
          value="label-5"
          type="radio"
          showTick
          onChange={event => onChange(event.currentTarget.value)}
          label="Radio Left"
        />
        <SelectableCard
          {...args}
          name="label-6"
          checked={value === 'label-6'}
          value="label-6"
          type="radio"
          showTick
          onChange={event => onChange(event.currentTarget.value)}
          label="Radio Right"
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <SelectableCard
          {...args}
          name="label-1"
          checked={value2['label-1']}
          value="label-1"
          type="checkbox"
          showTick
          onChange={event =>
            onChange2({ ...value2, 'label-1': event.currentTarget.checked })
          }
          label="Checkbox 1"
        />
        <SelectableCard
          {...args}
          name="label-2"
          checked={value2['label-2']}
          value="label-2"
          type="checkbox"
          showTick
          onChange={event =>
            onChange2({ ...value2, 'label-2': event.currentTarget.checked })
          }
          label="Checkbox 2"
        />
      </Stack>
    </>
  )
}

ShowTick.parameters = {
  docs: {
    description: {
      story:
        'Depending on your need you may want to display radio or checkbox tick. It can easily be done by using prop `showTick`.',
    },
  },
}
ShowTick.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
