import { UnitInput } from '../../../components/Data Entry/UnitInput'
import type { FilterComponentProps, FilterConfigItemUnit } from '../types'

type FilterUnitValue = { value: number | null; unit: string } | null

type FilterUnitProps = FilterComponentProps<FilterUnitValue, FilterConfigItemUnit>

export const FilterUnit = ({ value, onChange, config, hideLabel, size }: FilterUnitProps) => (
  <UnitInput
    aria-label={hideLabel ? config.label : undefined}
    label={hideLabel ? undefined : config.label}
    max={config.max}
    min={config.min}
    step={config.step}
    name={config.name}
    onChange={inputValue => onChange({ value: inputValue, unit: value?.unit ?? '' })}
    onChangeUnitValue={unitValue => onChange({ value: value?.value ?? null, unit: unitValue })}
    options={config.options}
    placeholder={config.placeholder}
    placeholderUnit={config.placeholderUnit}
    size={size}
    value={value?.value ?? undefined}
    unitValue={value?.unit}
  />
)
