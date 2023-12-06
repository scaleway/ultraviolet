import type {
  FieldError,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
  Validate,
} from 'react-hook-form'

export type MetaField = {
  min?: number | string
  max?: number | string
  minLength?: number
  maxLength?: number
  regex?: (RegExp | RegExp[])[]
  minDate?: Date
  maxDate?: Date
  label: string
  value?: string | number
}

export type RequiredErrors = {
  [key in FieldError['type']]: (params: MetaField) => string
}

export type FormErrors = {
  [key in
    | 'required'
    | 'min'
    | 'max'
    | 'minLength'
    | 'maxLength'
    | 'pattern'
    | 'minDate'
    | 'maxDate']: RequiredErrors[key]
}

export type BaseFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
  required?: boolean
  validate?: Validate<PathValue<TFieldValues, Path<TFieldValues>>, TFieldValues>
  rules?: UseControllerProps<TFieldValues>['rules']
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>
  label?: string
  value?: PathValue<TFieldValues, Path<TFieldValues>>
  onChange?: (value?: PathValue<TFieldValues, Path<TFieldValues>>) => void
}
