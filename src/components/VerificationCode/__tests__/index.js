import React from 'react'
import { VerificationCode } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

const pasteEventWithValue = value => {
  // `ClipboardEvent` extends `Event`. Start with creating a new `Event`
  // with 'paste' as the`typearg`
  const clipboardEvent = new Event('paste', {
    bubbles: true,
    cancelable: true,
    composed: true,
  })

  // set `clipboardData` and `getData` properties. Set your mocked properties here
  clipboardEvent.clipboardData = {
    getData: () => value,
  }

  return clipboardEvent
}

describe('VerificationCode', () => {
  test('renders correctly with default values', () => {
    shouldMatchEmotionSnapshot(<VerificationCode />)
  })

  test('renders correctly with initial value and placeholder and 6 fields', () => {
    shouldMatchEmotionSnapshot(
      <VerificationCode fields={6} initialValue="13" placeholder="0037" />,
    )
  })

  test('should handle paste with no overflowing values', () => {
    shouldMatchEmotionSnapshot(
      <VerificationCode type="number" fields={4} initialValue="1" />,
      {
        transform: ({ getByDisplayValue }) => {
          const inputElement = getByDisplayValue('1')
          const clipboardEvent = pasteEventWithValue('1234')
          inputElement.dispatchEvent(clipboardEvent)
        },
      },
    )
  })

  test('should handle and replace non number with "" when type is number', () => {
    shouldMatchEmotionSnapshot(
      <VerificationCode fields={4} initialValue="1" />,
      {
        transform: ({ getByDisplayValue }) => {
          const inputElement = getByDisplayValue('1')
          const clipboardEvent = pasteEventWithValue('1a34')
          inputElement.dispatchEvent(clipboardEvent)
        },
      },
    )
  })

  test('should handle paste with overflowing values', () => {
    shouldMatchEmotionSnapshot(
      <VerificationCode fields={4} initialValue="12" />,
      {
        transform: ({ getByDisplayValue }) => {
          const inputElement = getByDisplayValue('1')
          const clipboardEvent = pasteEventWithValue('123456')
          inputElement.dispatchEvent(clipboardEvent)
        },
      },
    )
  })

  test('should handle paste with overflowing values at different index than 0', () => {
    shouldMatchEmotionSnapshot(
      <VerificationCode fields={4} initialValue="12" />,
      {
        transform: ({ getByDisplayValue }) => {
          const inputElement = getByDisplayValue('2')
          const clipboardEvent = pasteEventWithValue('123456')
          inputElement.dispatchEvent(clipboardEvent)
        },
      },
    )
  })

  test('should handle paste when type is not number', () => {
    shouldMatchEmotionSnapshot(
      <VerificationCode type="text" fields={6} initialValue="12" />,
      {
        transform: ({ getByDisplayValue }) => {
          const inputElement = getByDisplayValue('2')
          const clipboardEvent = pasteEventWithValue('h23a*6')
          inputElement.dispatchEvent(clipboardEvent)
        },
      },
    )
  })
})
