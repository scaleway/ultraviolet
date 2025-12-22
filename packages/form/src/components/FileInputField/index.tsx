'use client'

import { FileInput } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type FileInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<
    ComponentProps<typeof FileInput>,
    'error' | 'name' | 'onChangeFiles' | 'label' | 'aria-label'
  > & { label: string }

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
  ...props
}: FileInputFieldProps<TFieldValues, TFieldName>) => {
  const { field } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      required,
    },
    shouldUnregister,
  })

  if (variant === 'overlay' && children) {
    return (
      <FileInput
        {...props}
        label={label}
        onChangeFiles={files => {
          field.onChange(files)
          onChange?.(files as PathValue<TFieldValues, Path<TFieldValues>>)
        }}
        required={required}
        title={title as ReactNode}
        variant="overlay"
      >
        {typeof children === 'function'
          ? (inputId, inputRef) => children(inputId, inputRef)
          : children}
      </FileInput>
    )
  }

  return (
    <FileInput
      {...props}
      bottom={bottom}
      label={label}
      onChangeFiles={files => {
        field.onChange(files)
        onChange?.(files as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      required={required}
      size={size}
      title={title}
      variant="dropzone"
    >
      {typeof children === 'function'
        ? (inputId, inputRef) => children(inputId, inputRef)
        : children}
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

export const FileInputField: FileInputFieldType = Object.assign(
  FileInputFieldBase,
  {
    Button: FileInput.Button,
    List: FileInput.List,
  },
)
