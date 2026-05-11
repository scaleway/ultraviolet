import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { TextAreaField } from '..'
import { Submit } from '../..'

export const Template: StoryFn<ComponentProps<typeof TextAreaField>> = args => (
  <div>
    <TextAreaField {...args} />
    <Submit>Submit</Submit>
  </div>
)

Template.args = {
  label: 'Label',
  name: 'textarea',
  required: true,
}
