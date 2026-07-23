import type { FormComponentProps } from '@ultraviolet/ui'
import type { FocusEvent } from 'react'
import type { FieldValues, FieldPath, FieldPathValue, RefCallBack } from 'react-hook-form'
import { useFormRegisterMode } from '../components/Form/registerMode'
import type { BaseFieldProps, MetaField } from '../types'
import { useControlledField } from './useControlledField'
import { useRegisterField } from './useRegisterField'

export type UseFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> & MetaField & FormComponentProps

export type FieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  onBlur: (event: FocusEvent) => Promise<void>
  onChange: (payload: unknown) => Promise<void>
  value?: FieldPathValue<TFieldValues, TFieldName>
  ref: RefCallBack
  error: string | undefined
}

const useFieldStrategy = (mode: boolean) => {
  return mode ? useRegisterField : useControlledField
}

/**
 * Hook to use in Field components to centralize the logic linked to React-Hook-Form and other common field props.
 */
export const useField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseFieldProps<TFieldValues, TFieldName>,
) => {
  const mode = useFormRegisterMode()

  return useFieldStrategy(mode)(props)
}
