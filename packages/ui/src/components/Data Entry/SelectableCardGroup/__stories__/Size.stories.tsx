import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCardGroup } from '..'
import { Stack } from '../../../Layout/Stack'
import { TextInput } from '../../TextInput'

export const Size: StoryFn<typeof SelectableCardGroup> = args => {
  const [value, setValue] = useState<Record<string, string>>({
    small: 'value-1',
    medium: 'value-1',
    large: 'value-1',
  })

  return (
    <Stack gap={3} maxWidth="500px">
      {(['small', 'medium', 'large'] as const).map(size => (
        <Stack direction="row" gap={4} key={size}>
          <SelectableCardGroup
            {...args}
            key={size}
            legend={size}
            name={size}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const currentValue = event.currentTarget.value
              setValue(current => ({ ...current, [size]: currentValue }))
            }}
            size={size}
            value={value[size]}
          >
            <SelectableCardGroup.Card label="Radio 1" value="value-1" />
            <SelectableCardGroup.Card label="Radio 2" value="value-2" />
          </SelectableCardGroup>

          <TextInput label={size} size={size} helper="Helper" />
        </Stack>
      ))}
    </Stack>
  )
}

Size.args = {
  showTick: true,
  type: 'radio',
  columns: 2,
  helper: 'Helper',
}

Size.parameters = {
  docs: {
    description: {
      story:
        'Change the `Card` size using prop `size`. Medium and Small should be used when the spaces are restricted, mainly without description and to be aligned with Inputs on the same area (e.g. Modal, Dialog, Table, in other cards ...).',
    },
  },
}
