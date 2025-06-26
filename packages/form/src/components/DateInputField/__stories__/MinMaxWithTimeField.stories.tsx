import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { DateInputField } from '..'
import { Submit } from '../../Submit'
import { TimeInputField } from '../../TimeInputField'

export const MinMaxDateWithTimeField: StoryFn<
  ComponentProps<typeof DateInputField>
> = ({ name, minDate, maxDate, required }) => (
  <Stack gap={1}>
    <DateInputField
      name={name}
      minDate={minDate}
      maxDate={maxDate}
      required={required}
    />
    <TimeInputField name={name} />
    <Submit>Submit</Submit>
  </Stack>
)

MinMaxDateWithTimeField.args = {
  maxDate: new Date(),
  name: 'date',
  required: true,
}
