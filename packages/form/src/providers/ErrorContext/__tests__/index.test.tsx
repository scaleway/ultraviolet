import { renderHook } from '@testing-library/react'
import { mockFormErrors, renderWithTheme } from '@utils/test'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { describe, expect, test } from 'vitest'
import { Form } from '../../../components/Form'
import { useErrors } from '..'

const HookWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm()

  return (
    <Form errors={mockFormErrors} onSubmit={() => null} methods={methods}>
      {children}
    </Form>
  )
}

describe('ErrorProvider', () => {
  test('renders correctly ', () => {
    const { result } = renderHook(() => useForm())
    const { asFragment } = renderWithTheme(
      <Form
        onSubmit={() => null}
        errors={mockFormErrors}
        methods={result.current}
      >
        Test
      </Form>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should return an error', () => {
    const { result } = renderHook(() => useErrors(), {
      wrapper: HookWrapper,
    })

    expect(
      result.current.getError({ label: 'test' }, { type: 'required' }),
    ).toStrictEqual(mockFormErrors.required({ label: '' }))

    expect(
      result.current.getError({ label: 'test', min: 3 }, { type: 'min' }),
    ).toEqual('This field is too low (minimum is: 3)')

    expect(
      result.current.getError(
        { label: 'test', minLength: 3 },
        { type: 'minLength' },
      ),
    ).toEqual('This field should have a length greater than 3')

    const customErrorString = 'This is an error'
    expect(
      result.current.getError(
        { label: 'test', minLength: 3 },
        { type: 'minLength', message: customErrorString },
      ),
    ).toEqual(customErrorString)
  })
})
