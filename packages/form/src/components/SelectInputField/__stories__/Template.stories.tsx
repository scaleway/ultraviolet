import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SelectInputField } from '..'

export const Template: StoryFn<
  StoryFn<ComponentProps<typeof SelectInputField>>
> = args => (
  <SelectInputField name="replace-me" {...args}>
    <SelectInputField.Option value="a">Option A</SelectInputField.Option>
    <SelectInputField.Option value="b">Option B</SelectInputField.Option>
  </SelectInputField>
)
