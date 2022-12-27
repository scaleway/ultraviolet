import { Stack } from '@scaleway/ui'
import type { Story } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateField } from '..'
import { Submit } from '../../Submit'
import { TimeField } from '../../TimeField'

const now = new Date()

export const MinMaxDateWithTimeField: Story<
  ComponentProps<typeof DateField>
> = ({ name, minDate, maxDate, required }) => (
  <Stack gap={1}>
    <DateField
      name={name}
      minDate={minDate}
      initialValue={now}
      maxDate={maxDate}
      required={required}
    />
    <TimeField name={name} />
    <Submit>Submit</Submit>
  </Stack>
)

MinMaxDateWithTimeField.args = {
  maxDate: new Date(),
  name: 'date and input',
  required: true,
}
