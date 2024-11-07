import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { DateInputV2 } from '..'
import { Stack } from '../../Stack'

const months = [
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
export const Range: StoryFn<ComponentProps<typeof DateInputV2>> = args => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const [startMonth, setStartMonth] = useState<Date | null>(
    new Date('March 2024'),
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
      <DateInputV2
        label="Date"
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        {...args}
      />
      Selected dates : {startDate?.toDateString()} - {endDate?.toDateString()}
      <DateInputV2
        label="Month"
        onChange={onChangeMonth}
        startDate={startMonth}
        endDate={endMonth}
        selectsRange
        showMonthYearPicker
        {...args}
      />
      Selected months : {startMonth ? months[startMonth.getMonth()] : null}
      {startMonth?.getFullYear()} -
      {endMonth ? months[endMonth.getMonth()] : null}
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
