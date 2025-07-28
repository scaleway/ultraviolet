import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { SelectableCard } from '..'

export const Type: StoryFn = args => {
  const [value, onChange] = useState('label-3')
  const [value2, onChange2] = useState({ 'label-1': true, 'label-2': true })

  return (
    <>
      <Stack direction="row" gap={2}>
        <SelectableCard
          {...args}
          checked={value === 'label-3'}
          label="Radio Left"
          name="label-3"
          onChange={event => onChange(event.currentTarget.value)}
          type="radio"
          value="label-3"
        />
        <SelectableCard
          {...args}
          checked={value === 'label-4'}
          label="Radio Right"
          name="label-4"
          onChange={event => onChange(event.currentTarget.value)}
          type="radio"
          value="label-4"
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <SelectableCard
          {...args}
          checked={value2['label-1']}
          label="Checkbox 1"
          name="label-1"
          onChange={event =>
            onChange2({ ...value2, 'label-1': !event.currentTarget.checked })
          }
          type="checkbox"
          value="label-1"
        />
        <SelectableCard
          {...args}
          checked={value2['label-2']}
          label="Checkbox 2"
          name="label-2"
          onChange={event =>
            onChange2({ ...value2, 'label-2': !event.currentTarget.checked })
          }
          type="checkbox"
          value="label-2"
        />
      </Stack>
    </>
  )
}

Type.parameters = {
  docs: {
    description: {
      story:
        'Two types exists for this component, it can either be a checkbox or a radio.',
    },
  },
}
Type.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
