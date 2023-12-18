import type { StoryFn } from '@storybook/react'
import type { SelectInputFieldProps } from '..'
import { SelectInputField } from '..'

export const Template: StoryFn<SelectInputFieldProps> = args => (
  <SelectInputField {...args}>
    <SelectInputField.Option value="a">Option A</SelectInputField.Option>
    <SelectInputField.Option value="b">Option B</SelectInputField.Option>
  </SelectInputField>
)
