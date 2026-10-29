'use client'

import { cn } from '@ultraviolet/utils'
import { useId, useRef } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { hasHelperText } from '../../../helpers/hasHelperText'
import type { BaseFormComponentProps } from '../../../types'
import { Stack } from '../../Layout/Stack'
import { VisuallyHidden } from '../../Other/VisuallyHidden'
import type { Popup as PopupDeprecated } from '../../Overlay/Popup'
import type { Popup } from '../../Overlay/Popup/v2'
import { Description } from '../../Typography/Description'
import { Label } from '../../Typography/Label'
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
   * Whether the component in readOnly
   */
  readOnly?: boolean
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
  /**
   * @deprecated alignment is automatic. The prop is ignored
   */
  dropdownAlign?: ComponentProps<typeof PopupDeprecated>['align']
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
  /** In some cases, when the space is limited, you will need to change the `portalTarget` of the dropdown for a higher parent element.
   * If you don't know which element to target, you can use `document.body`.
   */
  portalTarget?: ComponentProps<typeof Popup.Panel>['portalTarget']
  /**
   * Allow to specify a callback called when option dropdown is open
   * Please wrap that definition in useCallback
   */
  onOpen?: () => void
  groupError?: Record<string, ReactNode>
  groupEmptyState?: Record<string, ReactNode>
  /** @deprecated use prop `accessibleLabel` instead */
  'aria-label'?: string
  accessibleLabel?: string
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
  emptyState,
  error,
  footer,
  groupEmptyState,
  groupError,
  helper,
  id,
  isLoading,
  label,
  portalTarget,
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
  readOnly = false,
  required = false,
  selectAll,
  selectAllGroup = false,
  size = 'large',
  style,
  success,
  tooltip,
  value,
  accessibleLabel,
}: SelectInputProps<IsMulti>) => {
  const localId = useId()
  const finalId = id ?? localId
  const labelId = useId()
  const helperId = useId()
  const dropdownId = useId()
  const listboxId = useId()
  const ref = useRef<HTMLDivElement | null>(null)
  const numberOfOptions = Array.isArray(options)
    ? options.length
    : Object.values(options).reduce((acc, current) => acc + current.length, 0)

  const numberOfDisabledOptions = Array.isArray(options)
    ? options.filter(option => option.disabled).length
    : Object.values(options).reduce((acc, current) => acc + current.filter(option => option.disabled).length, 0)
  const finalDataTestId = dataTestId ?? `select-input-${name ?? 'name'}`
  const accessibleLabelComputed = accessibleLabel ?? ariaLabel

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
      <div className={cn(className, selectInputStyle.container)} onBlur={onBlur} onFocus={onFocus} style={style}>
        <Stack gap={0.5}>
          {label || labelDescription ? (
            <Label labelDescription={labelDescription} required={required} size={size} id={labelId}>
              {label}
            </Label>
          ) : null}
          {accessibleLabelComputed && !label ? (
            <VisuallyHidden as="label" id={labelId}>
              {accessibleLabelComputed}
            </VisuallyHidden>
          ) : null}
          <Dropdown
            addOption={addOption}
            disabled={disabled}
            descriptionDirection={descriptionDirection}
            emptyState={emptyState}
            footer={footer}
            groupEmptyState={groupEmptyState}
            groupError={groupError}
            id={dropdownId}
            isLoading={isLoading}
            listboxId={listboxId}
            loadMore={loadMore}
            optionalInfoPlacement={optionalInfoPlacement}
            placeholder={placeholderSearch}
            portalTarget={portalTarget}
            searchable={numberOfOptions >= 6 || !!addOption}
          >
            <SelectBar
              aria-describedby={ariaDescribedBy || (hasHelperText(helper, error, success) ? helperId : undefined)}
              aria-labelledby={ariaLabelledby ?? labelId}
              autoFocus={autofocus}
              clearable={clearable}
              data-testid={finalDataTestId}
              disabled={disabled}
              error={error}
              id={finalId}
              innerRef={ref}
              listboxId={listboxId}
              placeholder={placeholder}
              readOnly={readOnly}
              size={size}
              success={success}
              tooltip={tooltip}
              helperId={helperId}
              helper={helper}
            />
          </Dropdown>
        </Stack>
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
