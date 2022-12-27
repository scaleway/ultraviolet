import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TextBoxField } from '..'
import { Submit } from '../../Submit'

export const Required: Story<ComponentProps<typeof TextBoxField>> = args => (
  <Stack gap={1}>
    <TextBoxField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'required',
  required: true,
}
