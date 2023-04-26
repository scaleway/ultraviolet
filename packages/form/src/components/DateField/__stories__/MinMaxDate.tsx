import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateField } from '..'
import { Submit } from '../../Submit'

export const MinMaxDate: Story<ComponentProps<typeof DateField>> = args => (
  <Stack gap={1}>
    <DateField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

MinMaxDate.args = {
  maxDate: new Date('2021-12-31'),
  minDate: new Date('2021-01-01'),
  name: 'date',
  required: true,
}
