import type { StoryFn } from '@storybook/react-vite'
import type { FiltersProps } from '../Filters'
import { Filters } from '../Filters'
import type { FilterConfig } from '../types'

type FilterValues = {
  dates: {
    preset: string
    startAt: Date | null
    endAt: Date | null
  }
  name: string
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'medium',
  dateStyle: 'short',
})

const config: FilterConfig<FilterValues>[] = [
  {
    type: 'datetimeRange',
    name: 'dates',
    label: 'Dates',
    dateFormatter: date => dateFormat.format(date),
    dateInputLocale: 'fr',
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
    type: 'search',
    name: 'name',
    hideInDrawer: true,
    label: 'Name',
    placeholder: 'Type to search...',
  },
]

export const Dates: StoryFn<FiltersProps<FilterValues>> = props => <Filters {...props} />

Dates.args = {
  config,
  layout: {
    templateColumns: 'repeat(auto-fit, minmax(min(32ch, 100%), 1fr))',
  },
  defaultValues: {
    dates: {
      preset: 'last_30days',
      startAt: null,
      endAt: null,
    },
    name: 'John Doe',
  },
  labels: {
    clearAll: 'Clear all',
  },
}
