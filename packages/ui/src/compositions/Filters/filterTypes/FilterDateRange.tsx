import { DateInput } from '../../../components'
import type { FilterComponentProps, FilterConfigItemDateRange } from '../types'

export type DateRangeInputValue = {
  startAt: Date | null
  endAt: Date | null
}

type FilterDateRangeProps = FilterComponentProps<DateRangeInputValue, FilterConfigItemDateRange>

export const FilterDateRange = ({ config, hideLabel, onChange, value, size }: FilterDateRangeProps) => (
  <DateInput
    selectsRange
    minDate={config.minDate}
    maxDate={config.maxDate}
    aria-label={hideLabel ? config.label : undefined}
    label={hideLabel ? undefined : config.label}
    size={size}
    name={config.name}
    format={config.format}
    placeholder={config.placeholder}
    startDate={value?.startAt}
    endDate={value?.endAt}
    locale={config.locale}
    excludeDates={config.excludeDates}
    labelDescription={config.labelDescription}
    onChange={dates => {
      onChange({
        startAt: dates[0],
        endAt: dates[1],
      })
    }}
  />
)
