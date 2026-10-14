import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Stack } from '../../../Layout/Stack'

export const ShowTick: StoryFn = args => {
  const [radio, setRadio] = useState('label-5')
  const [checkbox, setCheckbox] = useState({ 'label-1': true, 'label-2': true })
  const [toggle, setToggle] = useState({ 'label-1': true, 'label-2': true })

  return (
    <>
      <Stack direction="row" gap={2}>
        <SelectableCard
          {...args}
          checked={radio === 'label-5'}
          label="Radio Left"
          name="label-5"
          onChange={event => setRadio(event.currentTarget.value)}
          showTick
          type="radio"
          value="label-5"
        />
        <SelectableCard
          {...args}
          checked={radio === 'label-6'}
          label="Radio Right"
          name="label-6"
          onChange={event => setRadio(event.currentTarget.value)}
          showTick
          type="radio"
          value="label-6"
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <SelectableCard
          {...args}
          checked={checkbox['label-1']}
          label="Checkbox 1"
          name="label-1"
          onChange={event => setCheckbox({ ...checkbox, 'label-1': event.currentTarget.checked })}
          showTick
          type="checkbox"
          value="label-1"
        />
        <SelectableCard
          {...args}
          checked={checkbox['label-2']}
          label="Checkbox 2"
          name="label-2"
          onChange={event => setCheckbox({ ...checkbox, 'label-2': event.currentTarget.checked })}
          showTick
          type="checkbox"
          value="label-2"
        />
      </Stack>

      <Stack direction="row" gap={2}>
        <SelectableCard
          {...args}
          checked={toggle['label-1']}
          label="Toggle 1"
          name="label-1"
          onChange={event => setToggle({ ...toggle, 'label-1': event.currentTarget.checked })}
          showTick
          type="toggle"
          value="label-1"
        />
        <SelectableCard
          {...args}
          checked={toggle['label-2']}
          label="Toggle 2"
          name="label-2"
          onChange={event => setToggle({ ...toggle, 'label-2': event.currentTarget.checked })}
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
