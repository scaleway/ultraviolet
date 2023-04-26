import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TextInputField } from '..'
import { Submit } from '../../Submit'

export const Required: Story<ComponentProps<typeof TextInputField>> = args => (
  <Stack gap={1}>
    <TextInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'required',
  required: true,
}
