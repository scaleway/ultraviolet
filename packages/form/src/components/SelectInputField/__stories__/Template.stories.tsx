import type { Story } from '@storybook/react'
import type { SelectInputFieldProps } from '..'
import { SelectInputField } from '..'

export const Template: Story<SelectInputFieldProps> = args => (
  <SelectInputField {...args}>
    <SelectInputField.Option value="value">Label</SelectInputField.Option>
    <SelectInputField.Option value="value2">Label 2</SelectInputField.Option>
  </SelectInputField>
)
