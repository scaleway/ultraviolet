'use client'

import { cn } from '@ultraviolet/utils'
import { useId, useRef } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { hasHelperText } from '../../helpers/hasHelperText'
import type { BaseFormComponentProps } from '../../types'
import { Description } from '../Description'
import { Label } from '../Label'
import type { Popup } from '../Popup'
import { Stack } from '../Stack'
import { Dropdown } from './components/Dropdown/Dropdown'
import { SelectBar } from './components/SelectBar/SelectBar'
import { SelectInputProvider } from './SelectInputProvider'
import type { DataType } from './types'
import { selectInputStyle } from './styles.css'

type SelectInputProps<IsMulti extends undefined | boolean = false> = BaseFormComponentProps<HTMLDivElement> & {
  /**
   * Place holder when no value defined
   */
  placeholder?: string
  /**
   * When searchable, placeholder when no value is searched
   */
  placeholderSearch?: string
  /**
   * Selectable options
   */
  options: DataType
  /**
   * Message to show when no option available
   */
  emptyState?: ReactNode
  /**
   * Whether it is possible to clear the search input
   */
  clearable?: boolean
  /**
   * Size of the input
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * More information regarding/description ofs the selectInput
   */
  labelDescription?: ReactNode
  /**
   * Whether option description is on the right of the option or under it
   */
  descriptionDirection?: 'row' | 'column'
  /**
   * Where to place the additional info prop
   */
  optionalInfoPlacement?: 'left' | 'right'
  /**
   * To add custom fixed elements at the bottom of the dropdown
   */
  footer?: ((closeDropdown: () => void) => ReactNode) | ReactNode
  /**
   * Display an error message under the select bar
   */
  error?: string | boolean
  /**
   * @deprecated This property is automatically enabled when options.length >= 6 or if addOption is enable.
   * Otherwise, no search bar
   */
  searchable?: boolean
  /**
   * When searchable, set a combobox to dynamically add an option
   */
  addOption?: { text: string; onClick: (searchText: string) => void }
  /**
   * Display a success message under the select bar
   */
  success?: string
  /**
   * Load more button to implement lazy loading
   */
  loadMore?: ReactNode
  /**
   * When the options are loading, display a skeleton
   */
  isLoading?: boolean
  /**
   * Add a tooltip around the select bar
   */
  tooltip?: string
  /**
   * Adds an option to select every selectable options
   */
  selectAll?: { label: ReactNode; description?: string }
  /**
   * When options are group, define a option to select every selectable options of a group
   */
  selectAllGroup?: boolean
  dropdownAlign?: ComponentProps<typeof Popup>['align']
  autofocus?: boolean
  /**
   * Whether it is possible to select multiple options
   */
  multiselect?: IsMulti
  /**
   * Default value, must be one of the options
   */
  value?: IsMulti extends true ? string[] : string
  onChange?: IsMulti extends true ? (value: string[]) => void : (value: string) => void
  /**
   * In some cases, when the space is limited, you will need to change the `portalTarget` of the dropdown for a higher parent element.
   * If you don't know which element to target, you can use `document.body`.
   */
  portalTarget?: ComponentProps<typeof Popup>['portalTarget']
  /**
   * Allow to specify a callback called when option dropdown is open
   * Please wrap that definition in useCallback
   */
  onOpen?: () => void
  groupError?: Record<string, ReactNode>
  groupEmptyState?: Record<string, ReactNode>
}
/**
 * SelectInput component is used to select one or many elements from a selection.
 */
export const SelectInput = <IsMulti extends undefined | boolean>({
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'data-testid': dataTestId,
  addOption,
  autofocus,
  className,
  clearable = false,
  descriptionDirection = 'column',
  disabled = false,
  dropdownAlign,
  emptyState,
  error,
  footer,
  groupEmptyState,
  groupError,
  helper,
  id,
  isLoading,
  label,
  labelDescription,
  loadMore,
  multiselect = false,
  name,
  onBlur,
  onChange,
  onFocus,
  onOpen,
  optionalInfoPlacement = 'right',
  options,
  placeholder = 'Select item',
  placeholderSearch = 'Search in list',
  portalTarget,
  readOnly = false,
  required = false,
  selectAll,
  selectAllGroup = false,
  size = 'large',
  style,
  success,
  tooltip,
  value,
}: SelectInputProps<IsMulti>) => {
  const localId = useId()
  const finalId = id ?? localId
  const helperId = useId()
  const dropdownId = useId()
  const ref = useRef<HTMLDivElement | null>(null)
  const numberOfOptions = Array.isArray(options)
    ? options.length
    : Object.values(options).reduce((acc, current) => acc + current.length, 0)

  const numberOfDisabledOptions = Array.isArray(options)
    ? options.filter(option => option.disabled).length
    : Object.values(options).reduce((acc, current) => acc + current.filter(option => option.disabled).length, 0)
  const finalDataTestId = dataTestId ?? `select-input-${name ?? 'name'}`

  return (
    <SelectInputProvider
      multiselect={multiselect}
      numberOfDisabledOptions={numberOfDisabledOptions}
      numberOfOptions={numberOfOptions}
      onChange={onChange}
      onOpen={onOpen}
      options={options}
      refSelect={ref}
      selectAll={selectAll}
      selectAllGroup={selectAllGroup}
      size={size}
      value={value}
    >
      <div
        aria-label={name}
        className={cn(className, selectInputStyle.container)}
        onBlur={onBlur}
        onFocus={onFocus}
        style={style}
      >
        <Dropdown
          addOption={addOption}
          disabled={disabled}
          descriptionDirection={descriptionDirection}
          dropdownAlign={dropdownAlign}
          emptyState={emptyState}
          footer={footer}
          groupEmptyState={groupEmptyState}
          groupError={groupError}
          id={dropdownId}
          isLoading={isLoading}
          loadMore={loadMore}
          optionalInfoPlacement={optionalInfoPlacement}
          placeholder={placeholderSearch}
          portalTarget={portalTarget}
          refSelect={ref}
          searchable={numberOfOptions >= 6 || !!addOption}
          size={size}
        >
          <Stack aria-label={ariaLabel} gap={0.5}>
            {label || labelDescription ? (
              <Label htmlFor={finalId} labelDescription={labelDescription} required={required} size={size}>
                {label}
              </Label>
            ) : null}
            <SelectBar
              aria-describedby={ariaDescribedBy || (hasHelperText(helper, error, success) ? helperId : undefined)}
              aria-labelledby={ariaLabelledby}
              autoFocus={autofocus} // oxlint-disable-line jsx_a11y/no-autofocus
              clearable={clearable}
              data-testid={finalDataTestId}
              disabled={disabled}
              dropdownId={dropdownId}
              error={error}
              id={finalId}
              innerRef={ref}
              label={label}
              placeholder={placeholder}
              readOnly={readOnly}
              size={size}
              success={success}
              tooltip={tooltip}
              helperId={helperId}
              helper={helper}
            />
          </Stack>
        </Dropdown>
        <Description
          error={error}
          success={success}
          helper={helper}
          disabled={disabled}
          id={ariaDescribedBy ?? helperId}
          className={selectInputStyle.helper}
        />
      </div>
    </SelectInputProvider>
  )
}

SelectInput.displayName = 'SelectInput'
