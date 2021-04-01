import fireEvent from '@testing-library/user-event'
import React from 'react'
import StealthCopiable from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('StealthCopiable', () => {
  beforeAll(() => {
    let data = ''

    window.clipboardData = {
      setData: jest.fn((_, val) => {
        data = val
      }),
      getData: jest.fn(() => data),
    }
  })

  it('should renders correctly', () => {
    shouldMatchEmotionSnapshot(<StealthCopiable>Hello</StealthCopiable>)
  })

  it('should renders correctly with custom side', () => {
    shouldMatchEmotionSnapshot(
      <StealthCopiable side="left">Hello</StealthCopiable>,
    )
  })

  it('should renders correctly with custom side', () => {
    shouldMatchEmotionSnapshot(
      <StealthCopiable side="left">Hello</StealthCopiable>,
      {
        transform: ({ getByText }) => {
          fireEvent.click(getByText('Copy'))
          expect(window.clipboardData.getData()).toBe('Hello')
        },
      },
    )
  })
})
