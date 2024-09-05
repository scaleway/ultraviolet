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

export type MetaField = {
  step?: number | string
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
    | 'step'
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
  required?: boolean
  validate?: Record<
    string,
    Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues>
  >
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>
  label?: string
  value?: PathValue<TFieldValues, Path<TFieldValues>>
  onChange?: (value?: PathValue<TFieldValues, TFieldName>) => void
  shouldUnregister?: UseControllerProps<
    TFieldValues,
    TFieldName
  >['shouldUnregister']
  control?: Control<TFieldValues>
}
