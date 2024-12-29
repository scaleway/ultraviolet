import type { CSSObject, Theme, css } from '@emotion/react'
import { SelectInput } from '@ultraviolet/ui'
import type {
  ComponentProps,
  ForwardedRef,
  ReactElement,
  ReactNode,
} from 'react'
import { Children, useCallback, useMemo } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { CommonProps, GroupBase, OptionProps, Props } from 'react-select'
import type Select from 'react-select'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

// Here we duplicate SelectInput types as they are using interfaces which are not portable
export type SelectInputType = typeof SelectInput

type SelectOption = {
  value: string
  label: ReactNode
  disabled?: boolean
  description?: string
  inlineDescription?: string
}

type WithSelectProps = {
  selectProps: SelectProps
}

type SelectStyleProps = {
  error?: string
  /**
   * Custom styles of the SelectInput. See [React select documentation](https://react-select.com/styles)
   */
  customStyle: (
    state: SelectProps & WithSelectProps,
  ) => Record<string, CSSObject>
  animation?: string
  /**
   * Time of the animation
   */
  animationDuration?: number
  /**
   * Show/hide the label inside the component
   */
  noTopLabel?: boolean
  theme: Theme
}

type StyledContainerProps = {
  isDisabled?: boolean
  additionalStyles?: Parameters<typeof css>[0]
}

type SelectProps = StyledContainerProps &
  Omit<Props<SelectOption>, 'value'> &
  CommonProps<SelectOption, boolean, GroupBase<SelectOption>> & {
    value?: string | SelectOption
    checked?: boolean
    error?: string
    labelId?: string
    required?: boolean
    time?: boolean
  }

type StateManagedSelect = typeof Select

type SelectInputProps = Partial<
  SelectProps &
    SelectStyleProps &
    Pick<ComponentProps<typeof SelectInput>, 'data-testid'> & {
      /**
       * Name of the animation
       */
      animation?: string
      /**
       * Play the animation when the value change
       */
      animationOnChange?: boolean
      disabled?: boolean
      readOnly?: boolean
      innerRef?: ForwardedRef<StateManagedSelect>
      /**
       * Custom components of the SelectInput. See [React select documentation](https://react-select.com/components)
       */
      customComponents?: SelectProps['components']
      children: ReactNode
      emptyState?: ComponentProps<Select>['noOptionsMessage']
    }
>

type SelectInputOptionProps = OptionProps
type SelectInputOptionElement = ReactElement<SelectInputOptionProps>
type SelectInputOptions = SelectProps['options']
type SelectInputOptionOrGroup = NonNullable<SelectInputOptions>[number]
type SelectInputOption = { value: string; label: string }

/**
 * @deprecated This component is deprecated, please use `SelectInputFieldV2` instead
 */
export type SelectInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TFieldName>, 'onChange'> &
  Partial<
    Pick<
      SelectInputProps,
      | 'animation'
      | 'animationDuration'
      | 'animationOnChange'
      | 'children'
      | 'className'
      | 'disabled'
      | 'error'
      | 'id'
      | 'inputId'
      | 'isClearable'
      | 'isLoading'
      | 'isSearchable'
      | 'menuPortalTarget'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'options'
      | 'placeholder'
      | 'readOnly'
      | 'required'
      | 'value'
      | 'noTopLabel'
      | 'emptyState'
      | 'customStyle'
      | 'data-testid'
    >
  > & {
    multiple?: boolean
    parse?: (value: unknown, name?: string) => unknown
    format?: (value: unknown, name: string) => unknown
    maxLength?: number
    minLength?: number
  }

const identity = (x: unknown) => x
// const identity = <T,>(x: T) => x

/**
 * @deprecated use SelectInputFieldV2 component instead
 */
export const SelectInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  animation,
  animationDuration,
  animationOnChange,
  children,
  className,
  disabled,
  // error: errorProp,
  format: formatProp = identity,
  // formatOnBlur,
  id,
  inputId,
  isClearable,
  isLoading,
  isSearchable,
  label = '',
  maxLength,
  menuPortalTarget,
  minLength,
  multiple,
  name,
  onBlur,
  onChange,
  onFocus,
  options: optionsProp,
  parse: parseProp = identity,
  placeholder,
  readOnly,
  required,
  noTopLabel,
  emptyState,
  customStyle,
  shouldUnregister = false,
  'data-testid': dataTestId,
  validate,
}: SelectInputFieldProps<TFieldValues, TFieldName>) => {
  const options = useMemo(
    () =>
      optionsProp ||
      ((
        Children.toArray(children)
          .flat()
          .filter(Boolean) as SelectInputOptionElement[]
      ).map(({ props: { children: labelChild, ...option } }) => ({
        ...option,
        label: labelChild,
      })) as SelectInputOptions),
    [optionsProp, children],
  )

  const parse = useMemo(
    () =>
      multiple
        ? parseProp
        : (option: unknown) =>
            parseProp((option as SelectInputOption)?.value ?? null, name),
    [multiple, parseProp, name],
  )

  const format = useCallback(
    (val: unknown) => {
      if (multiple) return formatProp(val, name) as SelectInputOption

      const find = (opts: SelectInputOptionOrGroup[], valueToFind: string) =>
        opts?.find(
          option => (option as SelectInputOption).value === valueToFind,
        )

      let selected:
        | SelectInputOptionOrGroup
        | (SelectInputOptionOrGroup | undefined)[]
        | string
        | undefined = ''

      if (val && options) {
        // TODO: find a proper way to simplify format with recursive options
        selected = find(
          options as unknown as SelectInputOptionOrGroup[],
          val as unknown as string,
        )

        if (!selected) {
          selected = options
            .map(curr =>
              find(
                (curr as unknown as { options: SelectInputOptionOrGroup[] })
                  .options,
                val as unknown as string,
              ),
            )
            .filter(identity)
          if (Array.isArray(selected) && selected.length === 0) {
            selected = ''
          }
        }
      }

      return formatProp(selected, name) as SelectInputOption
    },
    [formatProp, multiple, name, options],
  )

  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    shouldUnregister,
    rules: {
      required,
      minLength: minLength || required ? 1 : undefined,
      maxLength,
      validate,
    },
  })

  return (
    <SelectInput
      name={field.name}
      animation={animation}
      animationDuration={animationDuration}
      animationOnChange={animationOnChange}
      className={className}
      disabled={disabled}
      error={getError({ label, minLength, maxLength }, error)}
      id={id}
      inputId={inputId}
      isClearable={isClearable}
      isLoading={isLoading}
      isMulti={multiple}
      customStyle={customStyle}
      isSearchable={isSearchable}
      menuPortalTarget={menuPortalTarget}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={(event, action) => {
        field.onChange(parse(event))
        onChange?.(event, action)
      }}
      onFocus={onFocus}
      options={options}
      placeholder={placeholder}
      readOnly={readOnly}
      noTopLabel={noTopLabel}
      required={required}
      value={format(field.value)}
      emptyState={emptyState}
      data-testid={dataTestId}
    >
      {children}
    </SelectInput>
  )
}

SelectInputField.Option = SelectInput.Option
