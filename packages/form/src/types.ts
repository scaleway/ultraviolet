import type {
  AnyObject,
  FieldState,
  FieldSubscription,
  FieldValidator,
} from 'final-form'
import type { UseFieldConfig } from 'react-final-form'

export type FormErrorFunctionParams<InputValue = unknown> = {
  label: string
  name: string
  value: InputValue
  allValues: AnyObject
  meta?: FieldState<InputValue>
}

type RequiredErrors = {
  TOO_LOW:
    | ((params: FormErrorFunctionParams & { min: number }) => string)
    | string
  TOO_HIGH:
    | ((params: FormErrorFunctionParams & { max: number }) => string)
    | string
  MIN_LENGTH:
    | ((params: FormErrorFunctionParams & { minLength: number }) => string)
    | string
  MAX_LENGTH:
    | ((params: FormErrorFunctionParams & { maxLength: number }) => string)
    | string
  REGEX:
    | ((
        params: FormErrorFunctionParams & { regex: (RegExp | RegExp[])[] },
      ) => string)
    | string
  REQUIRED: ((params: FormErrorFunctionParams) => string) | string
  MAX_DATE:
    | ((params: FormErrorFunctionParams & { maxDate: Date }) => string)
    | string
  MIN_DATE:
    | ((params: FormErrorFunctionParams & { minDate: Date }) => string)
    | string
}

export type FormErrors = RequiredErrors

export type ValidatorProps = {
  required?: boolean
  min?: number
  minLength?: number
  max?: number
  maxLength?: number
  regex?: (RegExp | RegExp[])[]
  maxDate?: Date
  minDate?: Date
}

export type ValidatorObject<InputValue = unknown> = {
  validate: (
    value: InputValue,
    allValues?: AnyObject,
    meta?: FieldState<InputValue>,
  ) => boolean
  error: keyof RequiredErrors
}

export type BaseFieldProps<FieldValue, InputValue = unknown> = {
  parse?: UseFieldConfig<FieldValue, InputValue>['parse']
  format?: UseFieldConfig<FieldValue, InputValue>['format']
  formatOnBlur?: boolean
  subscription?: FieldSubscription
  validateFields?: string[]
  defaultValue?: FieldValue
  data?: AnyObject
  allowNull?: boolean
  initialValue?: FieldValue
  multiple?: boolean
  isEqual?: (a: InputValue, b: InputValue) => boolean
  validate?: FieldValidator<FieldValue>
  afterSubmit?: () => void
  beforeSubmit?: () => void | boolean
  value?: FieldValue
}
