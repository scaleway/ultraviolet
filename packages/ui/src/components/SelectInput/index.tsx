'use client'

import type { ComponentProps, HTMLAttributes, ReactNode } from 'react'
import { useId, useRef } from 'react'
import { Label } from '../Label'
import type { Popup } from '../Popup'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Dropdown } from './components/Dropdown'
import { SelectBar } from './components/SelectBar'
import { SelectInputProvider } from './SelectInputProvider'
import { selectinputContainer, selectinputHelper } from './styles.css'
import type { DataType } from './types'

type SelectInputProps<IsMulti extends undefined | boolean = false> = {
  /**
   * Input name
   */
  name?: string
  /**
   * Place holder when no value defined
   */
  placeholder?: string
  /**
   * When searchable, placeholder when no value is searched
   */
  placeholderSearch?: string
  /**
   * Label of the component
   */
  label?: string
  /**
   * Helper text to give more information to the user
   */
  helper?: string
  /**
   * Selectable options
   */
  options: DataType
  /**
   * Message to show when no option available
   */
  emptyState?: ReactNode
  /**
   * Whether it is possible to search through the input
   */
  searchable?: boolean
  /**
   * Whether the component in disabled
   */
  disabled?: boolean
  /**
   * Whether the component in readOnly
   */
  readOnly?: boolean
  /**
   * Whether it is possible to clear the search input
   */
  clearable?: boolean
  /**
   * Size of the input
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Whether field is required
   */
  required?: boolean
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
  onChange?: IsMulti extends true
    ? (value: string[]) => void
    : (value: string) => void
  'data-testid'?: string
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
} & Pick<
  HTMLAttributes<HTMLDivElement>,
  'id' | 'onBlur' | 'onFocus' | 'aria-label' | 'className' | 'style'
>

/**
 * SelectInput component is used to select one or many elements from a selection.
 */
export const SelectInput = <IsMulti extends undefined | boolean>({
  name,
  id,
  onBlur,
  onFocus,
  onChange,
  'aria-label': ariaLabel,
  value,
  label,
  helper,
  options,
  size = 'large',
  emptyState,
  descriptionDirection = 'column',
  success,
  error,
  'data-testid': dataTestId,
  className,
  tooltip,
  footer,
  placeholderSearch = 'Search in list',
  placeholder = 'Select item',
  searchable = true,
  disabled = false,
  readOnly = false,
  clearable = false,
  multiselect = false,
  required = false,
  labelDescription,
  autofocus,
  loadMore,
  optionalInfoPlacement = 'right',
  isLoading,
  selectAll,
  selectAllGroup = false,
  dropdownAlign,
  portalTarget,
  onOpen,
  style,
}: SelectInputProps<IsMulti>) => {
  const localId = useId()
  const finalId = id ?? localId
  const dropdownId = useId()
  const ref = useRef<HTMLDivElement | null>(null)
  const numberOfOptions = Array.isArray(options)
    ? options.length
    : Object.values(options).reduce(
        (acc, current) =>
          acc + current.filter(option => !option.disabled).length,
        0,
      )
  const finalDataTestId = dataTestId ?? `select-input-${name ?? 'name'}`

  return (
    <SelectInputProvider
      multiselect={multiselect}
      numberOfOptions={numberOfOptions}
      onChange={onChange}
      onOpen={onOpen}
      options={options}
      refSelect={ref}
      selectAll={selectAll}
      selectAllGroup={selectAllGroup}
      value={value}
    >
      <div
        aria-label={name}
        className={`${className ? `${className} ` : ''}${selectinputContainer}`}
        onBlur={onBlur}
        onFocus={onFocus}
        style={style}
      >
        <Dropdown
          descriptionDirection={descriptionDirection}
          dropdownAlign={dropdownAlign}
          emptyState={emptyState}
          footer={footer}
          id={dropdownId}
          isLoading={isLoading}
          loadMore={loadMore}
          optionalInfoPlacement={optionalInfoPlacement}
          placeholder={placeholderSearch}
          portalTarget={portalTarget}
          refSelect={ref}
          searchable={searchable}
          size={size}
        >
          <Stack aria-label={ariaLabel} gap={0.5}>
            {label || labelDescription ? (
              <Label
                htmlFor={finalId}
                labelDescription={labelDescription}
                required={required}
                size={size}
              >
                {label}
              </Label>
            ) : null}
            <SelectBar
              autoFocus={autofocus}
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
            />
          </Stack>
        </Dropdown>
        {!error && !success && helper ? (
          <Text
            as="p"
            className={selectinputHelper}
            prominence="weak"
            sentiment="neutral"
            variant="caption"
          >
            {helper}
          </Text>
        ) : null}
        {(error && typeof error === 'string') || success ? (
          <Text
            as="p"
            className={selectinputHelper}
            prominence="default"
            sentiment={error ? 'danger' : 'success'}
            variant="caption"
          >
            {error || success}
          </Text>
        ) : null}
      </div>
    </SelectInputProvider>
  )
}
