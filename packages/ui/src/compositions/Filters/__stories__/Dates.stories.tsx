import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack, Snippet } from '../../../components'
import type { FiltersProps } from '../Filters'
import { Filters } from '../Filters'
import type { FilterConfig } from '../types'

type FilterValues = {
  datetimes: {
    preset: string
    startAt: Date | null
    endAt: Date | null
  }
  dates: {
    startAt: Date | null
    endAt: Date | null
  }
}

const datetimeFormat = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'medium',
  dateStyle: 'short',
})

const config: FilterConfig<FilterValues>[] = [
  {
    type: 'datetimeRange',
    name: 'datetimes',
    label: 'DateTime Range',
    dateFormatter: date => datetimeFormat.format(date),
    maxDate: new Date(),
    minDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    relativePresets: [
      { relativeTime: 60 * 15 * 1000, value: 'last_15min', label: 'Last 15 minutes' },
      { relativeTime: 60 * 60 * 1000, value: 'last_hour', label: 'Last hour' },
      { relativeTime: 60 * 60 * 24 * 1000, value: 'last_24hours', label: 'Last 24 hours' },
      { relativeTime: 60 * 60 * 24 * 30 * 1000, value: 'last_30days', label: 'Last 30 days' },
      { relativeTime: 60 * 60 * 24 * 90 * 1000, value: 'last_90days', label: 'Last 90 days' },
    ],
    texts: {
      absolute: 'Absolute',
      apply: 'Apply',
      dropdownTitle: 'Select Date Range',
      from: 'From',
      relative: 'Relative',
      timeStart: 'Time Start',
      timeEnd: 'Time End',
      to: 'To',
    },
  },
  {
    type: 'dateRange',
    name: 'dates',
    label: 'Date Range',
    placeholder: 'DD/MM/YYYY - DD/MM/YYYY',
  },
]

export const Dates: StoryFn<FiltersProps<FilterValues>> = props => {
  const [submittedValues, setSubmittedValues] = useState({ ...props.defaultValues, ...props.initialValues })

  return (
    <Stack gap="4">
      <Filters onSubmit={setSubmittedValues} {...props} />
      <Stack direction="row" wrap gap="4">
        <div>
          <strong>Submitted values</strong>
          <Snippet initiallyExpanded>{JSON.stringify(submittedValues, null, 2)}</Snippet>
        </div>
      </Stack>
    </Stack>
  )
}

const today = new Date()
today.setHours(0, 0, 0, 0)
const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

Dates.args = {
  config,
  layout: {
    templateColumns: 'repeat(auto-fit, minmax(min(32ch, 100%), 1fr))',
  },
  defaultValues: {
    datetimes: {
      preset: 'last_30days',
      startAt: null,
      endAt: null,
    },
    dates: {
      startAt: null,
      endAt: null,
    },
  },
  initialValues: {
    dates: {
      startAt: oneWeekAgo,
      endAt: today,
    },
  },
  labels: {
    clearAll: 'Clear all',
  },
}
