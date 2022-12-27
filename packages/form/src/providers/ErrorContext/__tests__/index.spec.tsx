import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { Form as ReactFinalForm } from 'react-final-form'
import { ErrorProvider, useErrors } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'

const HookWrapper = ({ children }: { children: ReactNode }) => (
  <ReactFinalForm
    onSubmit={jest.fn()}
    render={() => <ErrorProvider errors={mockErrors}>{children}</ErrorProvider>}
  />
)
const baseMeta = {
  blur: () => {},
  change: () => {},
  focus: () => {},
  name: 'test',
}

describe('ErrorProvider', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(
      <ReactFinalForm
        onSubmit={jest.fn()}
        render={() => <ErrorProvider errors={mockErrors}>Test</ErrorProvider>}
      />,
    ))

  test('should return an error', () => {
    const { result } = renderHook(() => useErrors(), {
      wrapper: HookWrapper,
    })

    expect(result.current.errors).toStrictEqual(mockErrors)
    const requiredTouchedAndEmpty = {
      label: 'test',
      meta: {
        ...baseMeta,
        error: ['REQUIRED'],
        touched: true,
      },
      name: 'test',
      value: '',
    }
    expect(result.current.getError(requiredTouchedAndEmpty)).toStrictEqual(
      mockErrors.REQUIRED,
    )

    const minLengthTouchedAndInvalid = {
      label: 'test',
      meta: {
        ...baseMeta,
        error: ['MIN_LENGTH'],
        touched: true,
      },
      minLength: 3,
      name: 'test',
      value: 'yo',
    }
    expect(result.current.getError(minLengthTouchedAndInvalid)).toEqual(
      'This field should have a length greater than 3',
    )

    const minLengthWithInvalidInitialValue = {
      label: 'test',
      meta: {
        ...baseMeta,
        dirty: false,
        error: ['MIN_LENGTH'],
        touched: false,
      },
      minLength: 3,
      name: 'test',
      value: 'yo',
    }
    expect(result.current.getError(minLengthWithInvalidInitialValue)).toEqual(
      'This field should have a length greater than 3',
    )

    const customErrorString = 'This is an error'
    const minLengthWithInvalidValueAndCustomErrorMessage = {
      label: 'test',
      meta: {
        ...baseMeta,
        error: customErrorString,
        touched: true,
      },
      minLength: 3,
      name: 'test',
      value: 'yo',
    }
    expect(
      result.current.getError(minLengthWithInvalidValueAndCustomErrorMessage),
    ).toEqual(customErrorString)
  })

  test('should not return an error', () => {
    const { result } = renderHook(() => useErrors(), {
      wrapper: HookWrapper,
    })

    expect(result.current.errors).toStrictEqual(mockErrors)
    expect(
      result.current.getError({
        label: 'test',
        name: 'test',
        value: 'test',
      }),
    ).toStrictEqual(undefined)
    const requiredAndNotEmpty = {
      label: 'test',
      meta: {
        ...baseMeta,
        touched: true,
      },
      name: 'test',
      value: 'Hi there',
    }
    expect(result.current.getError(requiredAndNotEmpty)).toStrictEqual(
      undefined,
    )

    const requiredDirtyAndEmpty = {
      label: 'test',
      meta: {
        ...baseMeta,
        dirty: true,
        error: ['REQUIRED'],
        touched: false,
      },
      name: 'test',
      value: '',
    }
    expect(result.current.getError(requiredDirtyAndEmpty)).toStrictEqual(
      undefined,
    )

    // to cover all code branches and default values
    expect(
      result.current.getError({
        allValues: {},
        label: 'test',
        meta: {
          blur: () => {},
          change: () => {},
          error: [],
          focus: () => {},
          name: 'test',
        },
        minLength: 3,
        name: 'test',
        value: '',
      }),
    ).toEqual(undefined)
  })
})
