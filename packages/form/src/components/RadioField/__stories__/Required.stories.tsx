import { Stack } from '@scaleway/ui'
import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { RadioField } from '..'
import { Submit } from '../../Submit'

export const Required: StoryFn<ComponentProps<typeof RadioField>> = args => (
  <Stack gap={1}>
    <RadioField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'required',
  required: true,
}
