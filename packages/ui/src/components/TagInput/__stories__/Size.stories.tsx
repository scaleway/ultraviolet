import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { TAGINPUT_SIZE_PADDING, TagInput } from '..'
import { Stack } from '../../Stack'

export const Size: StoryFn<typeof TagInput> = args => {
  const [tags, setTags] = useState(['first', 'second'])

  return (
    <Stack gap="2">
      {(
        Object.keys(
          TAGINPUT_SIZE_PADDING,
        ) as (keyof typeof TAGINPUT_SIZE_PADDING)[]
      ).map(size => (
        <TagInput
          key={size}
          {...args}
          label={size}
          size={size}
          value={tags}
          onChange={setTags}
        />
      ))}
    </Stack>
  )
}
