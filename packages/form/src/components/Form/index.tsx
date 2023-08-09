import arrayMutators from 'final-form-arrays'
import type { JSX, ReactNode } from 'react'
import type {
  FormRenderProps,
  FormProps as ReactFinalFormProps,
} from 'react-final-form'
import { Form as ReactFinalForm } from 'react-final-form'
import { ErrorProvider } from '../../providers'
import type { FormErrors } from '../../types'

export type FormProps<FormValues = unknown> = {
  children?:
    | ((props: FormRenderProps<FormValues, Partial<FormValues>>) => ReactNode)
    | ReactNode
  errors: FormErrors
  /**
   * onRawSubmit is the base onSubmit from final-form
   */
  onRawSubmit: ReactFinalFormProps<FormValues, Partial<FormValues>>['onSubmit']
  initialValues?: Partial<FormValues>
  validateOnBlur?: ReactFinalFormProps<
    FormValues,
    Partial<FormValues>
  >['validateOnBlur']
  validate?: ReactFinalFormProps<FormValues, Partial<FormValues>>['validate']
  /**
   * The form name attribute
   */
  name?: string
  render?: ReactFinalFormProps<FormValues, Partial<FormValues>>['render']
  mutators?: ReactFinalFormProps<FormValues, Partial<FormValues>>['mutators']
  keepDirtyOnReinitialize?: boolean
  className?: string
  destroyOnUnregister?: ReactFinalFormProps<
    FormValues,
    Partial<FormValues>
  >['destroyOnUnregister']
}

export const Form = <FormValues,>({
  children,
  onRawSubmit,
  errors,
  initialValues,
  validateOnBlur,
  validate,
  name,
  render,
  mutators,
  keepDirtyOnReinitialize,
  className,
  destroyOnUnregister,
}: FormProps<FormValues>): JSX.Element => (
  <ReactFinalForm
    destroyOnUnregister={destroyOnUnregister}
    initialValues={initialValues}
    validateOnBlur={validateOnBlur}
    validate={validate}
    mutators={{
      ...arrayMutators,
      ...mutators,
    }}
    onSubmit={onRawSubmit}
    render={
      render ??
      (renderProps => (
        <ErrorProvider errors={errors}>
          <form
            noValidate
            name={name}
            onSubmit={renderProps.handleSubmit}
            className={className}
          >
            {typeof children === 'function' ? children(renderProps) : children}
          </form>
        </ErrorProvider>
      ))
    }
    keepDirtyOnReinitialize={keepDirtyOnReinitialize}
  />
)
