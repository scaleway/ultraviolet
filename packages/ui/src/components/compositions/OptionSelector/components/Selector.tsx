import { SelectInput } from '../../../SelectInput'
import type { DataType } from '../../../SelectInput/types'
import { firstSelectInput, secondSelectInput } from '../styles.css'
import type { OptionSelectorProps } from '../types'

export const Selector = ({
  isFirst,
  isHorizontal,
  disabled,
  size,
  error,
  onChange,
  options,
  readOnly,
  required,
  value,
  direction = 'horizontal',
  firstSelector: selector,
}: Pick<
  OptionSelectorProps,
  | 'size'
  | 'disabled'
  | 'error'
  | 'readOnly'
  | 'required'
  | 'direction'
  | 'firstSelector'
> & {
  isFirst?: boolean
  isHorizontal: boolean
  onChange: (val: string) => void
  options: DataType
  value?: string
}) => (
  <SelectInput
    aria-label={selector['aria-label']}
    className={
      isFirst ? firstSelectInput[direction] : secondSelectInput[direction]
    }
    data-testid={isFirst ? 'first-selector' : 'second-selector'}
    disabled={selector.disabled || disabled}
    emptyState={selector.emptyState}
    error={isHorizontal ? error || !!selector.error : error || selector.error}
    footer={selector.footer}
    helper={isHorizontal ? undefined : selector.helper}
    isLoading={selector.isLoading}
    label={isHorizontal ? undefined : selector.label}
    labelDescription={selector.labelDescription}
    loadMore={selector.loadMore}
    onChange={onChange}
    optionalInfoPlacement="right"
    options={options}
    placeholder={selector.placeholder}
    readOnly={readOnly}
    required={required}
    searchable={selector.searchable}
    size={size}
    tooltip={selector.tooltip}
    value={value}
  />
)
