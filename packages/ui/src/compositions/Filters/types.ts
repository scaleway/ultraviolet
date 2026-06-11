import type { DateInput, SelectInput, Slider } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { DatetimeRangeLocales } from './filterTypes/FilterDatetimeRange/type'

export type AnyObject = Record<string, unknown>

export type FilterPropsBase<Value> = {
  value: Value
  onChange: (value: Value) => void
  hideLabel?: boolean
}

export type FilterConfigItemBase = {
  name: string
  label: string
  placeholder?: string
  hideInDrawer?: boolean
  expanded?: boolean
}

export type FilterConfigItemText = FilterConfigItemBase & {
  type: 'text'
  regexp?: RegExp
  debounceDuration?: number
}

export type FilterConfigItemSearch = FilterConfigItemBase & {
  type: 'search'
  regexp?: RegExp
  debounceDuration?: number
}

export type FilterConfigItemSelect<V extends AnyObject = AnyObject> = FilterConfigItemBase & {
  type: 'select'
  options:
    | ComponentProps<typeof SelectInput>['options']
    | ((values: V) => ComponentProps<typeof SelectInput>['options'])
  clearable?: boolean
}

export type FilterConfigItemMultiSelect<V extends AnyObject = AnyObject> = FilterConfigItemBase &
  Pick<ComponentProps<typeof SelectInput>, 'searchable' | 'clearable' | 'selectAll' | 'selectAllGroup'> & {
    type: 'multiselect'
    options:
      | ComponentProps<typeof SelectInput>['options']
      | ((values: V) => ComponentProps<typeof SelectInput>['options'])
  }

export type FilterConfigItemSlider = FilterConfigItemBase &
  Pick<ComponentProps<typeof Slider>, 'options' | 'step' | 'unit' | 'min' | 'max' | 'double'> & {
    type: 'slider'
  }

type RelativePreset = {
  label: string
  value: string
  relativeTime: number
}
export type FilterConfigItemDatetimeRange = FilterConfigItemBase & {
  type: 'datetimeRange'
  minDate?: Date
  maxDate?: Date
  dateFormatter: (date: Date) => string
  texts: DatetimeRangeLocales
  dateInputLocale: ComponentProps<typeof DateInput>['locale']
  relativePresets: [RelativePreset, ...RelativePreset[]]
}

export type FilterConfigItemNumber = FilterConfigItemBase & {
  type: 'number'
  min?: number
  max?: number
  step?: number
}

export type FilterConfigItemCustom = FilterConfigItemBase & { type: string }

export type FilterConfigItem<V extends AnyObject = AnyObject> =
  | FilterConfigItemText
  | FilterConfigItemSearch
  | FilterConfigItemSelect<V>
  | FilterConfigItemMultiSelect<V>
  | FilterConfigItemSlider
  | FilterConfigItemDatetimeRange
  | FilterConfigItemCustom

export type FilterConfigGroup<V extends AnyObject = AnyObject> = {
  type: 'group'
  label: string
  items: FilterConfigItem<V>[]
  hideInDrawer?: boolean
  expanded?: boolean
}

export type FilterConfig<V extends AnyObject = AnyObject> = FilterConfigGroup<V> | FilterConfigItem<V>

export type FilterComponentProps<
  // oxlint-disable-next-line typescript/no-explicit-any
  Value = any,
  // oxlint-disable-next-line typescript/no-explicit-any
  Config = any,
  Values extends AnyObject = AnyObject,
> = FilterPropsBase<Value> & {
  config: Config
  size: 'large' | 'medium'
  directionContext: 'column' | 'row'
  values: Values
}
