import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { NumberInputFieldV2 } from '..'
import { Submit } from '../../Submit'

export const Required: StoryFn<
  ComponentProps<typeof NumberInputFieldV2>
> = args => (
  <Stack gap={1}>
    <NumberInputFieldV2 {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'value',
  required: true,
  label: 'This field is required',
  step: 1,
}
