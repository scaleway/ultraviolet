import { renderHook } from '@testing-library/react'
import type { ValidatorObject } from '../../types'
import { useValidation } from '../useValidation'

const fakeValidator = (success?: boolean) =>
  ({
    error: 'REQUIRED',
    validate: () => success,
  } as ValidatorObject<boolean>)

describe('useValidation', () => {
  test('should render correctly', () => {
    const { result } = renderHook(() => useValidation({ validators: [] }))
    expect(result.current).toBeDefined()
  })
  test('should call validation', () => {
    const { result } = renderHook(() => useValidation({ validators: [] }))
    expect(result.current(false, {})).toStrictEqual(undefined)
  })

  test('should have one error', () => {
    const { result } = renderHook(() =>
      useValidation({
        validators: [fakeValidator(false), fakeValidator(true)],
      }),
    )
    expect(result.current(false, {})).toStrictEqual(['REQUIRED'])
  })

  test('should have all success', () => {
    const { result } = renderHook(() =>
      useValidation({ validators: [fakeValidator(true)] }),
    )
    expect(result.current(false, {})).toStrictEqual(undefined)
  })

  test('should have validate return true', () => {
    const { result } = renderHook(() =>
      useValidation({ validate: () => true, validators: [] }),
    )
    expect(result.current(false, {})).toStrictEqual(undefined)
  })

  test('should have validate return false', () => {
    const { result } = renderHook(() =>
      useValidation({ validate: () => false, validators: [] }),
    )
    expect(result.current(false, {})).toStrictEqual(false)
  })
})
