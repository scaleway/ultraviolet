import type { Story } from '@storybook/react'
import type { TagInputFieldProps } from '..'
import { TagInputField } from '..'

export const Template: Story<TagInputFieldProps> = args => (
  <TagInputField {...args} />
)
