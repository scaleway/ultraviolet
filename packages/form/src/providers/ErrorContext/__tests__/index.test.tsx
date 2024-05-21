import { renderHook } from '@testing-library/react'
import { mockFormErrors, renderWithTheme } from '@utils/test'
import type { ReactNode } from 'react'
import { describe, expect, test } from 'vitest'
import { useErrors } from '..'
import { Form } from '../../../components/Form'

const HookWrapper = ({ children }: { children: ReactNode }) => (
  <Form errors={mockFormErrors} onRawSubmit={() => null}>
    {children}
  </Form>
)

describe('ErrorProvider', () => {
  test('renders correctly ', () => {
    const { asFragment } = renderWithTheme(
      <Form onRawSubmit={() => null} errors={mockFormErrors}>
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
