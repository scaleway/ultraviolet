import { ThemeProvider } from '@emotion/react'
import { theme as lightTheme } from '@scaleway/ui'
import { renderHook } from '@testing-library/react'
import type { ReactElement } from 'react'
import { CheckboxField, Form, TextInputField } from '../../components'
import { mockErrors } from '../../mocks'
import { useOnFieldChange } from '../useOnFieldChange'

type FormValues = {
  textInputName: string
  check: boolean
}

type Wrapers = {
  children: ReactElement
  initialValues: FormValues
}

const initial = {
  textInputName: 'test',
  check: true,
}

const updated = {
  textInputName: 'updated',
  check: false,
}

const Wrapper = ({ children, initialValues }: Wrapers) => (
  <ThemeProvider theme={lightTheme}>
    <Form<FormValues>
      initialValues={initialValues}
      errors={mockErrors}
      onRawSubmit={() => {}}
    >
      {children}
      <CheckboxField name="check" />
      <TextInputField name="textInputName" type="text" />
    </Form>
  </ThemeProvider>
)

describe('useOnFieldChange', () => {
  test('should render correctly', () => {
    const callback = jest.fn((value, values) => {
      expect(value).toBe(updated.textInputName)
      expect(values).toBe(updated)
    })

    let initialValues = initial

    const { result, rerender } = renderHook(
      () =>
        useOnFieldChange<FormValues['textInputName'], FormValues>(
          'textInputName',
          callback,
        ),
      {
        wrapper: ({ children }) => (
          <Wrapper initialValues={initialValues}>{children}</Wrapper>
        ),
      },
    )

    expect(result.current).toBeUndefined()

    expect(callback).toHaveBeenCalledTimes(0)

    initialValues = updated

    rerender()

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should render when condition change', () => {
    const callback = jest.fn()

    let initialValues = initial

    const { result, rerender } = renderHook(
      ({ enabled }) => {
        useOnFieldChange<FormValues['textInputName'], FormValues>(
          'textInputName',
          callback,
          // enabled will depends of rerender({ condition: '' })
          enabled,
        )
      },
      {
        wrapper: ({ children }) => (
          <Wrapper initialValues={initialValues}>{children}</Wrapper>
        ),

        initialProps: {
          enabled: false,
        },
      },
    )

    expect(result.current).toBeUndefined()

    expect(callback).toHaveBeenCalledTimes(0)

    initialValues = updated

    rerender({ enabled: true })

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
