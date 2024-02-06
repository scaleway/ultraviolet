import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TAGINPUT_SIZE_HEIGHT, TagInput } from '..'
import { Stack } from '../../Stack'

export const Size: StoryFn<typeof TagInput> = args => {
  const [tags, setTags] = useState(['first', 'second'])

  return (
    <Stack gap="2">
      {(
        Object.keys(
          TAGINPUT_SIZE_HEIGHT,
        ) as (keyof typeof TAGINPUT_SIZE_HEIGHT)[]
      ).map(size => (
        <TagInput
          {...args}
          label={size}
          size={size}
          tags={tags}
          onChange={setTags}
        />
      ))}
    </Stack>
  )
}
