import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { DateInput } from '..'

export const Range: StoryFn = args => {
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
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      {...args}
    />
  )
}

Range.parameters = {
  docs: {
    description: {
      story: 'With `startDate` and `endDate` you can define a range of dates',
    },
  },
}
