import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { TagInput } from '..'

export const Template: StoryFn<typeof TagInput> = args => {
  const [tags, setTags] = useState(['default'])

  return <TagInput name="template" onChange={setTags} value={tags} {...args} />
}

Template.args = {
  label: 'Tags',
  placeholder: 'Please enter tags',
}
