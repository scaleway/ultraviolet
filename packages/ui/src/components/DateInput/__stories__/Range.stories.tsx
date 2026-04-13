import { useState } from 'react'

import { DateInput } from '..'
import { Stack } from '../../Stack'

import type { StoryFn } from '@storybook/react-vite'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export const Range: StoryFn = args => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const [startMonth, setStartMonth] = useState<Date | null>(
    new Date('01/03/2024'),
  )
  const [endMonth, setEndMonth] = useState<Date | null>(null)

  const onChange = (dates: [Date | null, Date | null] | Date[]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const onChangeMonth = (dates: [Date | null, Date | null] | Date[]) => {
    const [start, end] = dates
    setStartMonth(start)
    setEndMonth(end)
  }

  return (
    <Stack>
      <DateInput
        endDate={endDate}
        label="Date"
        onChange={onChange}
        selectsRange
        startDate={startDate}
        {...args}
      />
      Selected dates : {startDate?.toDateString()} - {endDate?.toDateString()}
      <DateInput
        {...args}
        endDate={endMonth}
        label="Month"
        onChange={onChangeMonth}
        selectsRange
        showMonthYearPicker
        startDate={startMonth}
      />
      Selected months : {startMonth ? MONTHS[startMonth.getMonth()] : null}
      {startMonth?.getFullYear()} -
      {endMonth ? MONTHS[endMonth.getMonth()] : null}
      {endMonth?.getFullYear()}
    </Stack>
  )
}

Range.parameters = {
  docs: {
    description: {
      story: 'With `startDate` and `endDate` you can define a range of dates',
    },
  },
}

Range.decorators = [
  StoryComponent => (
    <div style={{ height: '400px' }}>
      <StoryComponent />
    </div>
  ),
]
