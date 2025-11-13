// oxlint-disable react/only-export-components
import type { RenderOptions } from '@testing-library/react'
import { render, renderHook } from '@testing-library/react'
import { consoleLightTheme, ThemeProvider } from '@ultraviolet/themes'
import type { ComponentProps, ReactElement, ReactNode } from 'react'
import type { FormErrors, UseFormProps } from '../../../../../packages/form/src'
import { Form, useForm } from '../../../../../packages/form/src/index'
import { makeShouldMatchSnapshot } from './shouldMatchSnapshot'
import { makeShouldMatchSnapshotWithPortal } from './shouldMatchSnapshotWithPortal'

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
  isInteger: ({ isInteger }) => {
    if (typeof isInteger === 'number') {
      if (Number.isInteger(isInteger)) {
        return 'This field should be a decimal number'
      }

      return 'This field should be a whole number'
    }

    return 'This field should be a number'
  },
  max: ({ max }) => `This field is too high (maximum is : ${max ?? ''})`,
  maxDate: ({ maxDate }) =>
    `This field should be before ${maxDate?.toString() ?? ''}`,
  maxLength: ({ maxLength }) =>
    `This field should have a length lower than ${maxLength ?? ''}`,
  min: ({ min }) => `This field is too low (minimum is: ${min ?? ''})`,
  minDate: ({ minDate }) =>
    `This field should be after ${minDate?.toString() ?? ''}`,
  minLength: ({ minLength }) =>
    `This field should have a length greater than ${minLength ?? ''}`,
  pattern: ({ regex }) =>
    `This field should match the regex ${(regex ?? [])
      .map(r =>
        Array.isArray(r)
          ? r.map(nestedRegex => nestedRegex.source).join(' or ')
          : r.source,
      )
      .join(' and ')}`,
  required: () => 'This field is required',
}

/**
 * use `asFragment()` from the `render` directly
 *
 * @example
 * ```tsx
 *  const { asFragment } = render(...)
 *
 *  expect(asFragment()).toMatchSnapshot()
 * ```
 *
 */

export const shouldMatchSnapshotWithPortal = (
  component: ReactElement,
  theme?: typeof consoleLightTheme,
) =>
  makeShouldMatchSnapshotWithPortal(component, {
    wrapper: ({ children }) => (
      <ComponentWrapper theme={theme}>{children}</ComponentWrapper>
    ),
  })

/**
 * use `asFragment()` from the `render` directly
 *
 * @example
 * ```tsx
 *  const { asFragment } = render(...)
 *
 *  expect(asFragment()).toMatchSnapshot()
 * ```
 *
 */
export const shouldMatchSnapshot = (
  component: ReactNode,
  theme?: typeof consoleLightTheme,
) =>
  makeShouldMatchSnapshot(component, {
    wrapper: ({ children }) => (
      <ComponentWrapper theme={theme}>{children}</ComponentWrapper>
    ),
  })

export const renderWithTheme = (
  compoment: ReactNode,
  theme?: typeof consoleLightTheme,
  options?: RenderOptions,
) =>
  render(compoment, {
    ...options,
    wrapper: ({ children }) => (
      <ComponentWrapper theme={theme}>{children}</ComponentWrapper>
    ),
  })

export const renderWithForm = (
  compoment: ReactElement,
  useFormProps?: UseFormProps,
  formProps?: Partial<ComponentProps<typeof Form>>,
  theme?: typeof consoleLightTheme,
) => {
  const { result } = renderHook(() =>
    useForm({ mode: 'onChange', ...useFormProps }),
  )

  return {
    ...renderWithTheme(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={() => {}}
        {...formProps}
      >
        {compoment}
      </Form>,
      theme,
    ),
    resultForm: result,
  }
}

export const defaultError = new Error('Default error message')
