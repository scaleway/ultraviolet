import type { Story } from '@storybook/react'
import { useState } from 'react'
import SelectableCard from '..'
import Stack from '../../Stack'

export const ShowTick: Story = () => {
  const [value, onChange] = useState('label-5')
  const [value2, onChange2] = useState({ 'label-1': true, 'label-2': true })

  return (
    <>
      <Stack direction="row" gap={2}>
        <SelectableCard
          name="label-5"
          checked={value === 'label-5'}
          value="label-5"
          type="radio"
          showTick
          onChange={event => onChange(event.currentTarget.value)}
          label="Radio Left"
        />
        <SelectableCard
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
          name="label-1"
          checked={value2['label-1']}
          value="label-1"
          type="checkbox"
          showTick
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
          showTick
          onChange={event =>
            onChange2({ ...value2, 'label-2': !event.currentTarget.checked })
          }
          label="Checkbox 2"
        />
      </Stack>
    </>
  )
}

ShowTick.parameters = {
  docs: {
    storyDescription:
      'Depending on your need you may want to display radio or checkbox tick. It can easily be done by using prop `showTick`.',
  },
}
ShowTick.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
]
