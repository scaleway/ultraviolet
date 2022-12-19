import { fireEvent } from '@testing-library/react'
import VerificationCode from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

const pasteEventWithValue = (selector: HTMLElement, value: string) =>
  fireEvent.paste(selector, {
    clipboardData: { getData: () => value },
  })

describe('VerificationCode', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<VerificationCode />))

  test('renders correctly with initial value and placeholder and 6 fields', () =>
    shouldMatchEmotionSnapshot(
      <VerificationCode fields={6} initialValue="13" placeholder="0037" />,
    ))

  test('should handle paste with no overflowing values', () =>
    shouldMatchEmotionSnapshot(
      <VerificationCode type="number" fields={4} initialValue="1" />,
      {
        transform: ({ getByDisplayValue }) => {
          pasteEventWithValue(getByDisplayValue('1'), '1234')
        },
      },
    ))

  test('should handle and replace non number with "" when type is number', () =>
    shouldMatchEmotionSnapshot(
      <VerificationCode fields={4} initialValue="1" />,
      {
        transform: ({ getByDisplayValue }) => {
          pasteEventWithValue(getByDisplayValue('1'), '1a34')
        },
      },
    ))

  test('should handle paste with overflowing values', () =>
    shouldMatchEmotionSnapshot(
      <VerificationCode fields={4} initialValue="12" />,
      {
        transform: ({ getByDisplayValue }) => {
          pasteEventWithValue(getByDisplayValue('1'), '123456')
        },
      },
    ))

  test('should handle paste with overflowing values at different index than 0', () =>
    shouldMatchEmotionSnapshot(
      <VerificationCode fields={4} initialValue="12" />,
      {
        transform: ({ getByDisplayValue }) => {
          pasteEventWithValue(getByDisplayValue('2'), '123456')
        },
      },
    ))

  test('should handle paste when type is not number', () =>
    shouldMatchEmotionSnapshot(
      <VerificationCode type="text" fields={6} initialValue="12" />,
      {
        transform: ({ getByDisplayValue }) => {
          pasteEventWithValue(getByDisplayValue('2'), 'h23a*6')
        },
      },
    ))

  test('should trigger onChange and onComplete after pasting values', () => {
    const onChange = jest.fn()
    const onComplete = jest.fn()

    const { getByDisplayValue } = renderWithTheme(
      <VerificationCode
        type="number"
        fields={4}
        initialValue="1"
        onChange={onChange}
        onComplete={onComplete}
      />,
    )

    pasteEventWithValue(getByDisplayValue('1'), '12')

    expect(onChange).toHaveBeenLastCalledWith('12')
    expect(onChange).toHaveBeenCalledTimes(1)

    pasteEventWithValue(getByDisplayValue('1'), '1234')
    expect(onComplete).toHaveBeenLastCalledWith('1234')
    expect(onComplete).toHaveBeenCalledTimes(1)
  })
})
