import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { DateInput } from '..'

export const Months: StoryFn = args => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <DateInput
      label="Date"
      startDate={startDate}
      endDate={endDate}
      onChange={onChange}
      showMonthYearPicker
      selectsRange
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
