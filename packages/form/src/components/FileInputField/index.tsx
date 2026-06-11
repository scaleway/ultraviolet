'use client'

import { FileInput } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type FileInputFieldProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = BaseFieldProps<
  TFieldValues,
  TFieldName
> &
  Omit<ComponentProps<typeof FileInput>, 'error' | 'name' | 'onChangeFiles' | 'label' | 'aria-label'> &
  XOR<
    [
      {
        label: string
      },
      { 'aria-label': string },
    ]
  >

/**
 * This component offers a form field based on Ultraviolet UI FileInput component
 *  @experimental This component is experimental and may be subject to breaking changes in the future.
 */

const FileInputFieldBase = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  onChange,
  label,
  required = false,
  name,
  shouldUnregister,
  control,
  variant,
  size,
  title,
  bottom,
  children,
  errorLabel,
  'aria-label': ariaLabel,
  ...props
}: FileInputFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()

  const computedLabel = label ?? ariaLabel ?? name

  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      required,
    },
    shouldUnregister,
  })

  const inputLabelProps = label ? { label } : { 'aria-label': ariaLabel ?? name }

  if (variant === 'overlay' && children) {
    return (
      <FileInput
        {...props}
        error={getError({ label: errorLabel ?? computedLabel }, error)}
        aria-label={computedLabel}
        onChangeFiles={files => {
          field.onChange(files)
          onChange?.(files as PathValue<TFieldValues, Path<TFieldValues>>)
        }}
        required={required}
        title={title as ReactNode}
        variant="overlay"
      >
        {typeof children === 'function' ? (inputId, inputRef) => children(inputId, inputRef) : children}
      </FileInput>
    )
  }

  return (
    <FileInput
      {...props}
      bottom={bottom}
      error={getError({ label: errorLabel ?? computedLabel }, error)}
      onChangeFiles={files => {
        field.onChange(files)
        onChange?.(files as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      required={required}
      size={size}
      title={title}
      variant="dropzone"
      {...inputLabelProps}
    >
      {typeof children === 'function' ? (inputId, inputRef) => children(inputId, inputRef) : children}
    </FileInput>
  )
}

/**
 * List is a component that displays a list of items based on the columns you provide and the data you pass.
 */
type FileInputFieldType = {
  (props: FileInputFieldProps<FieldValues, FieldPath<FieldValues>>): ReactNode
  List: typeof FileInput.List
  Button: typeof FileInput.Button
}

export const FileInputField: FileInputFieldType = Object.assign(FileInputFieldBase, {
  Button: FileInput.Button,
  List: FileInput.List,
})
