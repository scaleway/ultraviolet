import { useMemo } from 'react'
import { Label } from '../../../components/Label'
import { RadioGroup } from '../../../components/RadioGroup'
import { SelectInput } from '../../../components/SelectInput'
import type { FilterConfigItemSelect, AnyObject, FilterComponentProps } from '../types'

const DISPLAY_THRESHOLD = 10

type FilterSelectProps<Values extends AnyObject> = FilterComponentProps<string, FilterConfigItemSelect, Values>

export const FilterSelect = <V extends AnyObject>({
  hideLabel,
  directionContext,
  config,
  value,
  onChange,
  values,
  size,
}: FilterSelectProps<V>) => {
  const configOptions = config.options
  const options = useMemo(
    () => (typeof configOptions === 'function' ? configOptions(values) : configOptions),
    [values, configOptions],
  )

  if (directionContext === 'column' && Array.isArray(options) && options.length < DISPLAY_THRESHOLD) {
    return (
      <RadioGroup
        description={hideLabel ? undefined : <Label>{config.label}</Label>}
        name={config.name}
        onChange={event => {
          onChange?.(event.target.value)
        }}
        value={value}
      >
        {options.map(option => (
          <RadioGroup.Radio key={option.value} label={option.label} value={option.value} />
        ))}
      </RadioGroup>
    )
  }

  return (
    <SelectInput
      aria-label={hideLabel ? config.label : undefined}
      clearable={config.clearable}
      label={hideLabel ? undefined : config.label}
      size={size}
      name={config.name}
      onChange={onChange}
      options={options}
      placeholder={config.placeholder}
      value={value}
    />
  )
}
