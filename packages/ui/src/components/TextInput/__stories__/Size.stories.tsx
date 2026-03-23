import { useState } from 'react'

import { TextInput } from '..'
import { Stack } from '../../Stack'
import { TEXTINPUT_SIZE_HEIGHT } from '../constants'

import type { StoryFn } from '@storybook/react-vite'

export const Size: StoryFn<typeof TextInput> = args => {
  const [value, setValue] = useState<string>('Text')

  return (
    <Stack gap="2">
      {(
        Object.keys(
          TEXTINPUT_SIZE_HEIGHT,
        ) as (keyof typeof TEXTINPUT_SIZE_HEIGHT)[]
      ).map(size => (
        <TextInput
          key={size}
          {...args}
          label={size}
          onChange={event => setValue(event.target.value)}
          placeholder="Placeholder"
          size={size}
          value={value}
        />
      ))}
    </Stack>
  )
}
