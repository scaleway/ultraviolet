import { NumberInput } from '../../../components/data-entry/NumberInput'
import type { FilterComponentProps, FilterConfigItemNumber } from '../types'

type FilterNumberProps = FilterComponentProps<number | null, FilterConfigItemNumber>

export const FilterNumber = ({ config, hideLabel, onChange, value, size }: FilterNumberProps) => (
  <NumberInput
    max={config.max}
    min={config.min}
    aria-label={hideLabel ? config.label : undefined}
    label={hideLabel ? undefined : config.label}
    labelDescription={hideLabel ? undefined : config.labelDescription}
    size={size}
    name={config.name}
    onChange={onChange}
    placeholder={config.placeholder}
    value={value}
  />
)
