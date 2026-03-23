import { Stack } from '@ultraviolet/ui'

import { DateInputField } from '..'
import { Submit } from '../../Submit'
import { TimeInputField } from '../../TimeInputField'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const MinMaxDateWithTimeField: StoryFn<
  ComponentProps<typeof DateInputField>
> = ({ name, minDate, maxDate, required }) => (
  <Stack gap={1}>
    <DateInputField
      maxDate={maxDate}
      minDate={minDate}
      name={name}
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
