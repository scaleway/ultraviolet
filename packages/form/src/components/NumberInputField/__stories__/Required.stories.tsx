import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { NumberInputField } from '..'
import { Submit } from '../../Submit'

export const Required: StoryFn<
  ComponentProps<typeof NumberInputField>
> = args => (
  <Stack gap={1}>
    <NumberInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'value',
  required: true,
  label: 'This field is required',
  step: 1,
}
