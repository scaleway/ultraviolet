import { SelectInputV2 } from '@ultraviolet/ui'
import { type ComponentProps, useCallback } from 'react'
import type { FieldPath, FieldValues, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SelectInputFieldV2Props<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Pick<
    ComponentProps<typeof SelectInputV2>,
    | 'placeholder'
    | 'placeholderSearch'
    | 'label'
    | 'helper'
    | 'options'
    | 'emptyState'
    | 'searchable'
    | 'readOnly'
    | 'clearable'
    | 'size'
    | 'multiselect'
    | 'required'
    | 'descriptionDirection'
    | 'footer'
    | 'labelDescription'
    | 'success'
    | 'loadMore'
    | 'isLoading'
    | 'selectAll'
    | 'selectAllGroup'
    | 'autofocus'
    | 'data-testid'
    | 'id'
    | 'onBlur'
    | 'aria-label'
    | 'className'
    | 'onFocus'
    | 'optionalInfoPlacement'
    | 'disabled'
    | 'tooltip'
  >

export const SelectInputFieldV2 = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  autofocus,
  className,
  id,
  label = '',
  onFocus,
  onBlur,
  placeholder,
  readOnly,
  required,
  size,
  'data-testid': dataTestId,
  disabled,
  placeholderSearch,
  helper,
  options,
  emptyState,
  onChange,
  searchable,
  clearable,
  multiselect,
  descriptionDirection,
  footer,
  labelDescription,
  success,
  loadMore,
  isLoading,
  selectAll,
  selectAllGroup,
  name,
  'aria-label': ariaLabel,
  optionalInfoPlacement,
  shouldUnregister = false,
  control,
  validate,
  tooltip,
}: SelectInputFieldV2Props<TFieldValues, TFieldName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    shouldUnregister,
    rules: {
      required,
      validate,
    },
  })

  const { getError } = useErrors()

  const handleChange: ComponentProps<
    typeof SelectInputV2<typeof multiselect>
  >['onChange'] = useCallback(
    (value: string | string[]) => {
      onChange?.(value as PathValue<TFieldValues, TFieldName>)
      field.onChange(value)
    },
    [onChange, field],
  )

  return (
    <SelectInputV2
      name={field.name}
      options={options}
      required={required}
      size={size}
      data-testid={dataTestId}
      className={className}
      disabled={disabled}
      id={id}
      label={label}
      onFocus={onFocus}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      placeholder={placeholder}
      readOnly={readOnly}
      multiselect={multiselect}
      value={field.value as string | string[]}
      placeholderSearch={placeholderSearch}
      helper={helper}
      emptyState={emptyState}
      searchable={searchable}
      clearable={clearable}
      descriptionDirection={descriptionDirection}
      footer={footer}
      labelDescription={labelDescription}
      error={getError({ label }, error)}
      success={success}
      loadMore={loadMore}
      isLoading={isLoading}
      selectAll={selectAll}
      selectAllGroup={selectAllGroup}
      autofocus={autofocus}
      optionalInfoPlacement={optionalInfoPlacement}
      aria-label={ariaLabel}
      onChange={handleChange}
      tooltip={tooltip}
    />
  )
}
