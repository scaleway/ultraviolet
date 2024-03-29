import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { DateField } from '..'
import { Submit } from '../../Submit'
import { TimeField } from '../../TimeField'

export const MinMaxDateWithTimeField: StoryFn<
  ComponentProps<typeof DateField>
> = ({ name, minDate, maxDate, required }) => (
  <Stack gap={1}>
    <DateField
      name={name}
      minDate={minDate}
      maxDate={maxDate}
      required={required}
    />
    <TimeField name={name} />
    <Submit>Submit</Submit>
  </Stack>
)

MinMaxDateWithTimeField.args = {
  maxDate: new Date(),
  name: 'date',
  required: true,
}
