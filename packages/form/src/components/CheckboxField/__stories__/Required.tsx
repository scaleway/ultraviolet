import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { CheckboxField } from '..'
import { Submit } from '../../Submit'

export const Required: Story<ComponentProps<typeof CheckboxField>> = args => (
  <Stack gap={1}>
    <CheckboxField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'required',
  required: true,
}
