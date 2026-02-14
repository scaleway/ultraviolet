import { Stack } from '@ultraviolet/ui'
import { CodeEditor } from '@ultraviolet/ui/compositions/CodeEditor'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../../types'

export type CodeEditorFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof CodeEditor>, 'value' | 'onChange'> & {
    regex?: (RegExp | RegExp[])[]
    onChange?: (value: string) => void
    onBlur?: (value: string) => void
  }

export const CodeEditorField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  onChange,
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  required = false,
  validate,
  onBlur,
  ...props
}: CodeEditorFieldProps<TFieldValues, TFieldName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    rules: {
      required,
      validate,
    },
  })

  return (
    <Stack gap={1}>
      <CodeEditor
        aria-label={ariaLabel}
        data-testid={dataTestId}
        error={error?.message}
        onBlur={() => {
          field.onBlur()
          onBlur?.(field.value)
        }}
        onChange={value => {
          field.onChange(value)
          onChange?.(value)
        }}
        required={required}
        value={field.value}
        {...props}
      />
    </Stack>
  )
}
