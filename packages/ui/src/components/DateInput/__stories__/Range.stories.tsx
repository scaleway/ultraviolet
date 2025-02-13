import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { DateInput } from '..'
import { Stack } from '../../Stack'

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
export const Range: StoryFn<ComponentProps<typeof DateInput>> = args => {
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
      <DateInput
        label="Date"
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        {...args}
      />
      Selected dates : {startDate?.toDateString()} - {endDate?.toDateString()}
      <DateInput
        {...args}
        label="Month"
        onChange={onChangeMonth}
        startDate={startMonth}
        endDate={endMonth}
        selectsRange
        showMonthYearPicker
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
