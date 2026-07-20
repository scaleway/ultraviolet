import { renderHook } from '@testing-library/react'
import { consoleLightTheme, ThemeProvider } from '@ultraviolet/themes'
import { renderWithTheme } from '@utils/test'
import type { ComponentProps, ReactElement, ReactNode } from 'react'
import type { FormErrors, UseFormProps } from '..'
import { Form, useForm } from '..'

export const ComponentWrapper = ({
  children,
  theme = consoleLightTheme,
}: {
  children?: ReactNode
  theme?: typeof consoleLightTheme
}) => (
  <ThemeProvider theme={theme}>
    <div data-testid="testing">{children}</div>
  </ThemeProvider>
)

export const mockFormErrors: FormErrors = {
  isNumber: ({ value }) => `This field should be a number: ${value} `,
  isInteger: ({ value }) => `This field should be an integer ${value} `,
  max: ({ max }) => `This field is too high (maximum is : ${max ?? ''})`,
  maxDate: ({ maxDate }) => `This field should be before ${maxDate?.toString() ?? ''}`,
  maxLength: ({ maxLength }) => `This field should have a length lower than ${maxLength ?? ''}`,
  min: ({ min }) => `This field is too low (minimum is: ${min ?? ''})`,
  minDate: ({ minDate }) => `This field should be after ${minDate?.toString() ?? ''}`,
  minLength: ({ minLength }) => `This field should have a length greater than ${minLength ?? ''}`,
  pattern: ({ regex }) =>
    `This field should match the regex ${(regex ?? [])
      .map(r => (Array.isArray(r) ? r.map(nestedRegex => nestedRegex.source).join(' or ') : r.source))
      .join(' and ')}`,
  required: () => 'This field is required',
}

export const renderWithForm = (
  compoment: ReactElement,
  useFormProps?: UseFormProps,
  formProps?: Partial<ComponentProps<typeof Form>>,
  theme?: typeof consoleLightTheme,
) => {
  const { result } = renderHook(() => useForm({ mode: 'onChange', ...useFormProps }))

  const renderResult = renderWithTheme(
    <Form errors={mockFormErrors} methods={result.current} onSubmit={() => {}} {...formProps}>
      {compoment}
    </Form>,
    theme,
  )

  return {
    ...renderResult,
    resultForm: result,
  }
}

export const defaultError = new Error('Default error message')
