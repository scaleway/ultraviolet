import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TagInput } from '..'

export const Template: StoryFn<typeof TagInput> = args => {
  const [tags, setTags] = useState(['default'])

  return <TagInput name="template" tags={tags} onChange={setTags} {...args} />
}

Template.args = {
  label: 'Tags',
  placeholder: 'Please enter tags',
}
