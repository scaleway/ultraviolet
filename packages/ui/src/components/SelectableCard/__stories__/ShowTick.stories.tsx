import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { SelectableCard } from '..'

export const ShowTick: StoryFn = args => {
  const [value, onChange] = useState('label-5')
  const [value2, onChange2] = useState({ 'label-1': true, 'label-2': true })
  const [value3, onChange3] = useState({ 'label-1': true, 'label-2': true })

  return (
    <>
      <Stack direction="row" gap={2}>
        <SelectableCard
          {...args}
          checked={value === 'label-5'}
          label="Radio Left"
          name="label-5"
          onChange={event => onChange(event.currentTarget.value)}
          showTick
          type="radio"
          value="label-5"
        />
        <SelectableCard
          {...args}
          checked={value === 'label-6'}
          label="Radio Right"
          name="label-6"
          onChange={event => onChange(event.currentTarget.value)}
          showTick
          type="radio"
          value="label-6"
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <SelectableCard
          {...args}
          checked={value2['label-1']}
          label="Checkbox 1"
          name="label-1"
          onChange={event =>
            onChange2({ ...value2, 'label-1': event.currentTarget.checked })
          }
          showTick
          type="checkbox"
          value="label-1"
        />
        <SelectableCard
          {...args}
          checked={value2['label-2']}
          label="Checkbox 2"
          name="label-2"
          onChange={event =>
            onChange2({ ...value2, 'label-2': event.currentTarget.checked })
          }
          showTick
          type="checkbox"
          value="label-2"
        />
      </Stack>

      <Stack direction="row" gap={2}>
        <SelectableCard
          {...args}
          checked={value3['label-1']}
          label="Toggle 1"
          name="label-1"
          onChange={event =>
            onChange3({ ...value3, 'label-1': event.currentTarget.checked })
          }
          showTick
          type="toggle"
          value="label-1"
        />
        <SelectableCard
          {...args}
          checked={value3['label-2']}
          label="Toggle 2"
          name="label-2"
          onChange={event =>
            onChange3({ ...value3, 'label-2': event.currentTarget.checked })
          }
          showTick
          type="toggle"
          value="label-2"
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
