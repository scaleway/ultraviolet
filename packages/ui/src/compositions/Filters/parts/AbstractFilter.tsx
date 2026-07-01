import type { ComponentType } from 'react'
import { FilterDatetimeRange } from '../filterTypes/FilterDatetimeRange/FilterDatetimeRange'
import { FilterMultiSelect } from '../filterTypes/FilterMultiSelect'
import { FilterNumber } from '../filterTypes/FilterNumber'
import { FilterSearch } from '../filterTypes/FilterSearch'
import { FilterSelect } from '../filterTypes/FilterSelect'
import { FilterSlider } from '../filterTypes/FilterSlider'
import { FilterText } from '../filterTypes/FilterText'
import type { FilterComponentProps, FilterConfig } from '../types'

type AbstractFilterProps = FilterComponentProps & {
  customComponents?: Record<string, ComponentType<FilterComponentProps>>
}

const defaultFieldComponents = {
  text: FilterText,
  search: FilterSearch,
  select: FilterSelect,
  multiselect: FilterMultiSelect,
  slider: FilterSlider,
  datetimeRange: FilterDatetimeRange,
  number: FilterNumber,
}

const defaultCustomComponents = {}
export const AbstractFilter = ({
  hideLabel,
  config,
  directionContext,
  onChange,
  value,
  values,
  customComponents = defaultCustomComponents,
  size,
}: AbstractFilterProps) => {
  const shouldHideLabel = directionContext === 'column' && hideLabel
  const availableComponents = { ...defaultFieldComponents, ...customComponents }

  const isAvailableType = (configItem: unknown): configItem is { type: keyof typeof availableComponents } =>
    (configItem as FilterConfig).type in availableComponents

  if (isAvailableType(config)) {
    const Component = availableComponents[config.type] as ComponentType<FilterComponentProps>

    return (
      <Component
        config={config}
        size={size}
        directionContext={directionContext}
        onChange={onChange}
        hideLabel={shouldHideLabel}
        value={value as unknown}
        values={values}
      />
    )
  }

  return null
}
