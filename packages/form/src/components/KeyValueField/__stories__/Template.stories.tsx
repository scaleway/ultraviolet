import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { KeyValueField } from '..'

export const Template: StoryFn<ComponentProps<typeof KeyValueField>> = args => (
  <KeyValueField {...args} />
)

Template.args = {
  name: 'template',
}
