import { renderHook } from '@testing-library/react'
import { mockFormErrors, renderWithForm } from '@utils/test'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { describe, expect, it } from 'vitest'
import { useErrors } from '..'
import { Form } from '../../../components/Form'

const HookWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm()

  return (
    <Form errors={mockFormErrors} methods={methods} onSubmit={() => null}>
      {children}
    </Form>
  )
}

describe('errorProvider', () => {
  it('renders correctly ', () => {
    const { asFragment } = renderWithForm(<>Test</>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should return an error', () => {
    const { result } = renderHook(() => useErrors(), {
      wrapper: HookWrapper,
    })

    expect(result.current.getError({ label: 'test' }, { type: 'required' })).toStrictEqual(
      mockFormErrors.required({ label: '' }),
    )

    expect(result.current.getError({ label: 'test', min: 3 }, { type: 'min' })).toBe(
      'This field is too low (minimum is: 3)',
    )

    expect(result.current.getError({ label: 'test', minLength: 3 }, { type: 'minLength' })).toBe(
      'This field should have a length greater than 3',
    )

    const customErrorString = 'This is an error'
    expect(
      result.current.getError({ label: 'test', minLength: 3 }, { message: customErrorString, type: 'minLength' }),
    ).toStrictEqual(customErrorString)
  })
})
