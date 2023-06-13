import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TextInputField } from '..'

export const Template: StoryFn<
  ComponentProps<typeof TextInputField>
> = args => <TextInputField {...args} />

Template.args = {
  name: 'template',
}
