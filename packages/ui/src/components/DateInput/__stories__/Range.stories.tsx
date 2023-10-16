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
      // @ts-expect-error: The type of onChange depend to the type of WithRange. "https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-datepicker/index.d.ts#L124"
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectRange
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
