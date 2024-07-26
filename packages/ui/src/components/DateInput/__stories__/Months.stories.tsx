import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { DateInput } from '..'

export const Months: StoryFn = args => {
  const [date, setDate] = useState<
    Date | Date[] | [Date | null, Date | null] | null
  >(new Date('December 17, 1995 03:24:00'))

  return (
    <DateInput
      label="Date"
      onChange={setDate}
      value={date as Date}
      showMonthYearPicker
      {...args}
    />
  )
}

Months.parameters = {
  docs: {
    description: {
      story:
        'Using prop `showMonthYearPicker` you can select only months and years.',
    },
  },
}
