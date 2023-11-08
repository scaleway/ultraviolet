import { describe, expect, test } from '@jest/globals'
import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { useErrors } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import { Form } from '../../../components/Form'
import { mockErrors } from '../../../mocks'

const HookWrapper = ({ children }: { children: ReactNode }) => (
  <Form errors={mockErrors} onRawSubmit={() => null}>
    {children}
  </Form>
)

describe('ErrorProvider', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(
      <Form onRawSubmit={() => null} errors={mockErrors}>
        Test
      </Form>,
    ))

  test('should return an error', () => {
    const { result } = renderHook(() => useErrors(), {
      wrapper: HookWrapper,
    })

    expect(
      result.current.getError({ label: 'test' }, { type: 'required' }),
    ).toStrictEqual(mockErrors.required({ label: '' }))

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
