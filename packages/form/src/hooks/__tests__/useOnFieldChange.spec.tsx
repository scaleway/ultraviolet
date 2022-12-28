import { ThemeProvider } from '@emotion/react'
import { theme as lightTheme } from '@scaleway/ui'
import { renderHook } from '@testing-library/react'
import type { ReactElement } from 'react'
import { CheckboxField, Form, TextBoxField } from '../../components'
import { mockErrors } from '../../mocks'
import { useOnFieldChange } from '../useOnFieldChange'

type FormValues = {
  textBoxName: string
  check: boolean
}

type Wrapers = {
  children: ReactElement
  initialValues: FormValues
}

const initial = {
  textBoxName: 'test',
  check: true,
}

const updated = {
  textBoxName: 'updated',
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
      <TextBoxField name="textBoxName" type="text" />
    </Form>
  </ThemeProvider>
)

describe('useOnFieldChange', () => {
  test('should render correctly', () => {
    const callback = jest.fn((value, values) => {
      expect(value).toBe(updated.textBoxName)
      expect(values).toBe(updated)
    })

    let initialValues = initial

    const { result, rerender } = renderHook(
      () =>
        useOnFieldChange<FormValues['textBoxName'], FormValues>(
          'textBoxName',
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
      ({ condition }) => {
        useOnFieldChange<FormValues['textBoxName'], FormValues>(
          'textBoxName',
          callback,
          // Condition will depends of rerender({ condition: '' })
          condition,
        )
      },
      {
        wrapper: ({ children }) => (
          <Wrapper initialValues={initialValues}>{children}</Wrapper>
        ),

        initialProps: {
          condition: false,
        },
      },
    )

    expect(result.current).toBeUndefined()

    expect(callback).toHaveBeenCalledTimes(0)

    initialValues = updated

    rerender({ condition: true })

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
