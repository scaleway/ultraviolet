import { useMemo } from 'react'
import { CheckboxGroup } from '../../../components/CheckboxGroup'
import { Label } from '../../../components/Label'
import { SelectInput } from '../../../components/SelectInput'
import type { FilterConfigItemMultiSelect, AnyObject, FilterComponentProps } from '../types'
import { SELECT_DISPLAY_THRESHOLD } from './FilterSelect'

type FilterMultiSelectProps<Values extends AnyObject> = FilterComponentProps<
  string[],
  FilterConfigItemMultiSelect,
  Values
>

export const FilterMultiSelect = <V extends AnyObject>({
  hideLabel,
  directionContext,
  config,
  value,
  onChange,
  values,
  size,
}: FilterMultiSelectProps<V>) => {
  const configOptions = config.options
  const options = useMemo(
    () => (typeof configOptions === 'function' ? configOptions(values) : configOptions),
    [values, configOptions],
  )

  if (
    directionContext === 'column' &&
    Array.isArray(options) &&
    !config.selectAll &&
    options.length < (config.displayThreshold ?? SELECT_DISPLAY_THRESHOLD)
  ) {
    return (
      <CheckboxGroup
        description={hideLabel ? undefined : <Label>{config.label}</Label>}
        name={config.name}
        onChange={event => {
          if (value.includes(event.currentTarget.value)) {
            onChange(value.filter(currentValue => currentValue !== event.currentTarget.value))
          } else {
            onChange([...value, event.currentTarget.value])
          }
        }}
        value={value}
      >
        {options.map(option => (
          <CheckboxGroup.Checkbox key={option.value} name={config.name} value={option.value}>
            {option.label}
          </CheckboxGroup.Checkbox>
        ))}
      </CheckboxGroup>
    )
  }

  return (
    <SelectInput
      aria-label={hideLabel ? config.label : undefined}
      label={hideLabel ? undefined : config.label}
      multiselect
      name={config.name}
      size={size}
      clearable={config.clearable}
      onChange={onChange}
      options={options}
      placeholder={config.placeholder}
      searchable={config.searchable}
      selectAll={config.selectAll}
      selectAllGroup={config.selectAllGroup}
      value={value}
    />
  )
}
