import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { TagInputField } from '..'
import { Submit } from '../../Submit'

export const Required: StoryFn<ComponentProps<typeof TagInputField>> = args => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <TagInputField {...args} />
    <Submit>Submit</Submit>
  </div>
)

Required.args = {
  name: 'tags',
  required: true,
  label: 'This field is required',
}
