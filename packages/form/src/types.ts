import type { FormComponentProps } from '@ultraviolet/ui'
import type { FocusEvent } from 'react'
import type {
  Control,
  FieldError,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
  Validate,
} from 'react-hook-form'

/**
 * this type is used by the packages/form/src/providers/ErrorContext/index.tsx
 * should be migrate
 */
export type MetaField = {
  min?: number | string
  max?: number | string
  minLength?: number
  maxLength?: number
  regex?: (RegExp | RegExp[])[]
  minDate?: Date
  maxDate?: Date
  label?: string
  value?: string | number
}

export type RequiredErrors = {
  [key in FieldError['type']]: (params: MetaField) => string
}

export type FormErrors = {
  [key in
    | 'required'
    | 'isNumber'
    | 'isInteger'
    | 'min'
    | 'max'
    | 'minLength'
    | 'maxLength'
    | 'pattern'
    | 'minDate'
    | 'maxDate']: RequiredErrors[key]
}

export type BaseFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TFieldName
  validate?: Record<string, Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues>>
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>
  value?: PathValue<TFieldValues, Path<TFieldValues>>
  onChange?: (value?: PathValue<TFieldValues, TFieldName>) => void
  onBlur?: (event?: FocusEvent) => void
  shouldUnregister?: UseControllerProps<TFieldValues, TFieldName>['shouldUnregister']
  control?: Control<TFieldValues>
  errorLabel?: string
} & FormComponentProps

export type PascalToCamelCase<S extends string> = S extends `${infer P1}${infer P2}` ? `${Lowercase<P1>}${P2}` : S

export type RemoveSuffix<S extends string, Suffix extends string> = S extends `${infer Prefix}${Suffix}` ? Prefix : S

/**
 * This type removes the suffix from a PascalCase string and converts it to camelCase. Pretty useful for Icon, CategoryIcon and ProductIcon components.
 * Their names being `AddressIcon` but we might need to have `address` as the prop name.
 */
export type PascalToCamelCaseWithoutSuffix<
  T extends string,
  Suffix extends string,
> = T extends `${infer Prefix}${Suffix}`
  ? `${PascalToCamelCase<Prefix extends `${infer First}${infer Rest}` ? `${First}${Rest}` : never>}`
  : never
