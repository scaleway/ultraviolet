import type { Story } from '@storybook/react'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Stack } from '../../Stack'

export const Type: Story = () => {
  const [value, onChange] = useState('label-3')
  const [value2, onChange2] = useState({ 'label-1': true, 'label-2': true })

  return (
    <>
      <Stack direction="row" gap={2}>
        <SelectableCard
          name="label-3"
          checked={value === 'label-3'}
          value="label-3"
          type="radio"
          onChange={event => onChange(event.currentTarget.value)}
          label="Radio Left"
        />
        <SelectableCard
          name="label-4"
          checked={value === 'label-4'}
          value="label-4"
          type="radio"
          onChange={event => onChange(event.currentTarget.value)}
          label="Radio Right"
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <SelectableCard
          name="label-1"
          checked={value2['label-1']}
          value="label-1"
          type="checkbox"
          onChange={event =>
            onChange2({ ...value2, 'label-1': !event.currentTarget.checked })
          }
          label="Checkbox 1"
        />
        <SelectableCard
          name="label-2"
          checked={value2['label-2']}
          value="label-2"
          type="checkbox"
          onChange={event =>
            onChange2({ ...value2, 'label-2': !event.currentTarget.checked })
          }
          label="Checkbox 2"
        />
      </Stack>
    </>
  )
}

Type.parameters = {
  docs: {
    storyDescription:
      'Two types exists for this component, it can either be a checkbox or a radio.',
  },
}
Type.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
