import { SelectInputV2 } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SelectInputFieldV2Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
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
    | 'onChange'
    | 'id'
    | 'onBlur'
    | 'aria-label'
    | 'className'
    | 'onFocus'
    | 'optionalInfoPlacement'
    | 'disabled'
  >

export const SelectInputFieldV2 = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
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
  rules,
  shouldUnregister = false,
}: SelectInputFieldV2Props<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    shouldUnregister,
    rules: {
      required,
      ...rules,
    },
  })

  const { getError } = useErrors()

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
      value={field.value}
      placeholderSearch={placeholderSearch}
      helper={helper}
      emptyState={emptyState}
      searchable={searchable}
      clearable={clearable}
      multiselect={multiselect}
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
      onChange={value => {
        field.onChange(value)
        onChange?.(value)
      }}
    />
  )
}
