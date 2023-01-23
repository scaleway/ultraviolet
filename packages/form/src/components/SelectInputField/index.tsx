import type { CSSObject, Theme, css } from '@emotion/react'
import { SelectInput } from '@scaleway/ui'
import type { FieldState } from 'final-form'
import type {
  ComponentProps,
  ForwardedRef,
  ReactElement,
  ReactNode,
} from 'react'
import { Children, useCallback, useMemo } from 'react'
import type { CommonProps, GroupBase, OptionProps, Props } from 'react-select'
import type Select from 'react-select'
import { useFormField } from '../../hooks'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

// Here we duplicate SelectInput types as they are using interfaces which are not portable
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
    SelectStyleProps & {
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

export type SelectInputFieldProps<
  T extends SelectInputOptionOrGroup = SelectInputOptionOrGroup,
> = BaseFieldProps<T> &
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
    | 'noOptionsMessage'
    | 'customStyle'
  > & {
    label?: string
    maxLength?: number
    minLength?: number
    name: string
  }

const identity = <T,>(x: T) => x

export const SelectInputField = <
  T extends SelectInputOptionOrGroup = SelectInputOptionOrGroup,
>({
  animation,
  animationDuration,
  animationOnChange,
  children,
  className,
  disabled,
  error: errorProp,
  format: formatProp = identity as NonNullable<BaseFieldProps<T>['format']>,
  formatOnBlur,
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
  parse: parseProp = identity as NonNullable<BaseFieldProps<T>['parse']>,
  placeholder,
  readOnly,
  required,
  value,
  noTopLabel,
  noOptionsMessage,
  customStyle,
}: SelectInputFieldProps<T>) => {
  const { getError } = useErrors()

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
    (val: T) => {
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

      return formatProp(selected as T, name) as SelectInputOption
    },
    [formatProp, multiple, name, options],
  )

  const { input, meta } = useFormField<T, HTMLElement, SelectInputOption>(
    name,
    {
      disabled,
      format,
      formatOnBlur,
      maxLength,
      minLength: minLength || required ? 1 : undefined,
      multiple,
      parse,
      required,
      value,
    },
  )

  const error = getError({
    errorProp,
    label,
    meta: meta as FieldState<unknown>,
    name,
    value: input.value,
  })

  return (
    <SelectInput
      animation={animation}
      animationDuration={animationDuration}
      animationOnChange={animationOnChange}
      className={className}
      disabled={disabled}
      error={error}
      id={id}
      inputId={inputId}
      isClearable={isClearable}
      isLoading={isLoading}
      isMulti={input.multiple}
      customStyle={customStyle}
      isSearchable={isSearchable}
      menuPortalTarget={menuPortalTarget}
      name={name}
      onBlur={event => {
        input.onBlur(event)
        onBlur?.(event)
      }}
      onChange={(event, action) => {
        input.onChange(event)
        onChange?.(event, action)
      }}
      onFocus={event => {
        input.onFocus(event)
        onFocus?.(event)
      }}
      options={options}
      placeholder={placeholder}
      readOnly={readOnly}
      value={input.value}
      noTopLabel={noTopLabel}
      required={required}
      noOptionsMessage={noOptionsMessage}
    >
      {children}
    </SelectInput>
  )
}

SelectInputField.Option = SelectInput.Option
