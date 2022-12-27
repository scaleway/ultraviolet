import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { ToggleField } from '..'
import { Submit } from '../../Submit'

export const Required: Story<ComponentProps<typeof ToggleField>> = args => (
  <Stack gap={1}>
    <ToggleField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'required',
  required: true,
}
