import fireEvent from '@testing-library/user-event'
import React from 'react'
import StealthCopiable from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

const ComplexChild = ({ children }) => <div>{children}</div>

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

  it('should renders correctly with a complex children', () => {
    shouldMatchEmotionSnapshot(
      <StealthCopiable side="left">
        <ComplexChild>
          <span>Hello</span>
        </ComplexChild>
      </StealthCopiable>,
      {
        transform: ({ getByText }) => {
          fireEvent.click(getByText('Copy'))
          expect(window.clipboardData.getData()).toBe('Hello')
        },
      },
    )
  })
})
