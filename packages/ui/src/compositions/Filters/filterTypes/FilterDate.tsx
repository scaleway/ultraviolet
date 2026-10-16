import { DateInput } from '../../../components'
import type { FilterComponentProps, FilterConfigItemDate } from '../types'

type FilterDateProps = FilterComponentProps<Date | null, FilterConfigItemDate>

export const FilterDate = ({ config, hideLabel, onChange, value, size }: FilterDateProps) => (
  <DateInput
    minDate={config.minDate}
    maxDate={config.maxDate}
    aria-label={hideLabel ? config.label : undefined}
    label={hideLabel ? undefined : config.label}
    size={size}
    name={config.name}
    format={config.format}
    placeholder={config.placeholder}
    value={value}
    locale={config.locale}
    excludeDates={config.excludeDates}
    labelDescription={hideLabel ? undefined : config.labelDescription}
    onChange={onChange}
  />
)
