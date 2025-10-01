import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { TagInput } from '..'
import { TAGINPUT_SIZE_PADDING } from '../styles.css'

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
          onChange={setTags}
          size={size}
          value={tags}
        />
      ))}
    </Stack>
  )
}
