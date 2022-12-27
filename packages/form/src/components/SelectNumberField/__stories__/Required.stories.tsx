import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { SelectNumberField } from '..'
import { Submit } from '../../Submit'

export const Required: Story<
  ComponentProps<typeof SelectNumberField>
> = args => (
  <Stack gap={1}>
    <SelectNumberField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'required',
  required: true,
}
