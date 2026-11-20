import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Stack } from '../../../Layout/Stack'

export const Size: StoryFn = args => {
  const [checkbox, setCheckbox] = useState({ small: true, medium: true, large: true })

  return (
    <>
      {(['small', 'medium', 'large'] as const).map(size => (
        <SelectableCard
          showTick
          type="checkbox"
          {...args}
          key={size}
          checked={checkbox[size]}
          label={size}
          name={size}
          onChange={event => setCheckbox({ ...checkbox, [size]: event.currentTarget.checked })}
          value={size}
          size={size}
        />
      ))}
    </>
  )
}

Size.parameters = {
  docs: {
    description: {
      story:
        'Change the `Card` size using prop `size`. Medium and Small should be used when the spaces are restricted, mainly without description and to be aligned with Inputs on the same area (e.g. Modal, Dialog, Table, in other cards ...).',
    },
  },
}

Size.decorators = [
  StoryComponent => (
    <Stack gap={2} maxWidth="300px">
      <StoryComponent />
    </Stack>
  ),
]
