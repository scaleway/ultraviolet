import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../../Submit'
import { CustomerSatisfactionField } from '..'

export const Required: StoryFn<
  ComponentProps<typeof CustomerSatisfactionField>
> = args => (
  <Stack gap={1}>
    <CustomerSatisfactionField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  label: 'This review is required',
  name: 'required-customer-satisfaction',
  required: true,
}
