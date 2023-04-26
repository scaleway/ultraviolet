import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateField } from '..'
import { Submit } from '../../Submit'

export const Required: Story<ComponentProps<typeof DateField>> = args => (
  <Stack gap={1}>
    <DateField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'required',
  required: true,
}
