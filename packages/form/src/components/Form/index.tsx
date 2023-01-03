import type { Decorator } from 'final-form'
import arrayMutators from 'final-form-arrays'
import createDecorator from 'final-form-focus'
import type { ReactNode } from 'react'
import type {
  FormRenderProps,
  FormProps as ReactFinalFormProps,
} from 'react-final-form'
import { Form as ReactFinalForm } from 'react-final-form'
import { ErrorProvider } from '../../providers'
import type { FormErrors } from '../../types'

const focusOnErrors = createDecorator()

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
}: FormProps<FormValues>): JSX.Element => (
  <ReactFinalForm
    initialValues={initialValues}
    validateOnBlur={validateOnBlur}
    validate={validate}
    decorators={[
      focusOnErrors as unknown as Decorator<FormValues, Partial<FormValues>>,
    ]}
    mutators={{
      ...arrayMutators,
      ...mutators,
    }}
    onSubmit={onRawSubmit}
    render={
      render ??
      (renderProps => (
        <ErrorProvider errors={errors}>
          <form noValidate name={name} onSubmit={renderProps.handleSubmit}>
            {typeof children === 'function' ? children(renderProps) : children}
          </form>
        </ErrorProvider>
      ))
    }
    className={className}
    keepDirtyOnReinitialize={keepDirtyOnReinitialize}
  />
)
