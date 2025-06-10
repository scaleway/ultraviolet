import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TEXTINPUT_SIZE_HEIGHT, TextInput } from '..'
import { Stack } from '../../Stack'

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
          size={size}
          value={value}
          onChange={event => setValue(event.target.value)}
          placeholder="Placeholder"
        />
      ))}
    </Stack>
  )
}
