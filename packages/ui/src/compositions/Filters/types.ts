import type { ComponentProps } from 'react'
import type { DateInput } from '../../components/DateInput'
import type { SelectInput } from '../../components/SelectInput'
import type { Slider } from '../../components/Slider'
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
  /**
   * When true, the filter/group will not be displayed in the Drawer. Make sure it appears in the main row.
   */
  hideInDrawer?: boolean
  /**
   * Expand/collapse the filter/group in the Drawer
   */
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
  /**
   * When the filter is displayed in the Drawer, the
   * options are rendered as a RadioGroup if their count is below this threshold.
   * Grouped options always render as a Select.
   * @default 5
   */
  displayThreshold?: number
}

export type FilterConfigItemMultiSelect<V extends AnyObject = AnyObject> = FilterConfigItemBase &
  Pick<ComponentProps<typeof SelectInput>, 'searchable' | 'clearable' | 'selectAll' | 'selectAllGroup'> & {
    type: 'multiselect'
    options:
      | ComponentProps<typeof SelectInput>['options']
      | ((values: V) => ComponentProps<typeof SelectInput>['options'])
    /**
     * When the filter is displayed in the Drawer, the
     * options are rendered as a CheckboxGroup if their count is below this
     * threshold. Grouped options or a `selectAll` config always render as a MultiSelect.
     * @default 5
     */
    displayThreshold?: number
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

export type FilterConfigItemDateRange = FilterConfigItemBase & {
  type: 'dateRange'
} & Pick<
    ComponentProps<typeof DateInput>,
    'minDate' | 'maxDate' | 'format' | 'locale' | 'excludeDates' | 'labelDescription'
  >

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
  | FilterConfigItemDateRange
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
