import { renderHook } from '@testing-library/react'
import { ThemeProvider } from '@ultraviolet/themes'
import { theme as lightTheme } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { CheckboxField, Form, TextInputField } from '../../components'
import { mockErrors } from '../../mocks'
import { useOnFieldChange } from '../useOnFieldChange'

type FormValues = {
  textInputName: string
  check: boolean
}

type Wrapers = {
  children: ReactNode
  defaultValues: FormValues
}

const initial = {
  check: true,
  textInputName: 'test',
}

const updated = {
  check: false,
  textInputName: 'updated',
}

const Wrapper = ({ children, defaultValues }: Wrapers) => {
  const methods = useForm({
    values: defaultValues,
  })

  return (
    <ThemeProvider theme={lightTheme}>
      <Form<FormValues>
        errors={mockErrors}
        methods={methods}
        onSubmit={() => {}}
      >
        {children}
        <CheckboxField name="check" />
        <TextInputField name="textInputName" type="text" />
      </Form>
    </ThemeProvider>
  )
}

describe('useOnFieldChange', () => {
  test('should render correctly', () => {
    const callback = vi.fn((value, values) => {
      expect(value).toBe(updated.textInputName)
      expect(values).toStrictEqual(updated)
    })

    let defaultValues = initial

    const { result, rerender } = renderHook(
      () =>
        useOnFieldChange<FormValues, 'textInputName'>(
          'textInputName',
          callback,
        ),
      {
        wrapper: ({ children }) => (
          <Wrapper defaultValues={defaultValues}>{children}</Wrapper>
        ),
      },
    )

    expect(result.current).toBeUndefined()

    expect(callback).toHaveBeenCalledTimes(0)

    defaultValues = updated

    rerender()

    expect(callback).toHaveBeenCalledOnce()
  })

  test('should render when condition change', () => {
    const callback = vi.fn()

    let defaultValues = initial

    const { result, rerender } = renderHook(
      ({ enabled }) => {
        useOnFieldChange<FormValues, 'textInputName'>(
          'textInputName',
          callback,
          // enabled will depends of rerender({ condition: '' })
          enabled,
        )
      },
      {
        initialProps: {
          enabled: false,
        },
        wrapper: ({ children }) => (
          <Wrapper defaultValues={defaultValues}>{children}</Wrapper>
        ),
      },
    )

    expect(result.current).toBeUndefined()

    expect(callback).toHaveBeenCalledTimes(0)

    defaultValues = updated

    rerender({ enabled: true })

    expect(callback).toHaveBeenCalledOnce()
  })
})
