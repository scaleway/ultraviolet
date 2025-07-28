import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { TEXTINPUT_SIZE_HEIGHT, TextInput } from '..'

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
          {...args}
          key={size}
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
