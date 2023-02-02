import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { NumberInputField } from '..'
import { Submit } from '../../Submit'

export const Required: Story<
  ComponentProps<typeof NumberInputField>
> = args => (
  <Stack gap={1}>
    <NumberInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'required',
  required: true,
}
