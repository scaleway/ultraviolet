import type { Story } from '@storybook/react'
import type { RichSelectFieldProps } from '..'
import { RichSelectField } from '..'

export const Template: Story<RichSelectFieldProps> = args => (
  <RichSelectField {...args}>
    <RichSelectField.Option value="value">Label</RichSelectField.Option>
    <RichSelectField.Option value="value2">Label 2</RichSelectField.Option>
  </RichSelectField>
)
