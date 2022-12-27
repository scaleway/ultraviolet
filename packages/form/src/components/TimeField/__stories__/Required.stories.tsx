import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TimeField } from '..'
import { Submit } from '../../Submit'

export const Required: Story<ComponentProps<typeof TimeField>> = args => (
  <Stack gap={1}>
    <TimeField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'required',
  required: true,
}
