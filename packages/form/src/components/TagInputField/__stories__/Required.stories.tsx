import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { TagInputField } from '..'

export const Required: StoryFn<ComponentProps<typeof TagInputField>> = args => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <TagInputField {...args} />
    <Submit>Submit</Submit>
  </div>
)

Required.args = {
  label: 'This field is required',
  name: 'tags',
  required: true,
}
