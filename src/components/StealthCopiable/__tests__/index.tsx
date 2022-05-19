import fireEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import StealthCopiable from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

const ComplexChild = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
)

describe('StealthCopiable', () => {
  beforeAll(() => {
    let data = ''

    // @ts-expect-error we are voluntarily based on an older browser spec
    window.clipboardData = {
      getData: jest.fn(() => data),
      setData: jest.fn((_, val: string) => {
        data = val
      }),
    }
  })

  it('should renders correctly', () =>
    shouldMatchEmotionSnapshot(<StealthCopiable>Hello</StealthCopiable>))

  it('should renders correctly with custom side', () =>
    shouldMatchEmotionSnapshot(
      <StealthCopiable side="left">Hello</StealthCopiable>,
    ))

  it('should renders correctly with custom side', () =>
    shouldMatchEmotionSnapshot(
      <StealthCopiable side="left">Hello</StealthCopiable>,
      {
        transform: ({ getByText }) => {
          fireEvent.click(getByText('Copy'))
          // @ts-expect-error we are voluntarily based on an older browser spec
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          expect(window.clipboardData.getData()).toBe('Hello')
        },
      },
    ))

  it('should renders correctly with a complex children', () =>
    shouldMatchEmotionSnapshot(
      <StealthCopiable side="left">
        <ComplexChild>
          <span>Hello</span>
        </ComplexChild>
      </StealthCopiable>,
      {
        transform: ({ getByText }) => {
          fireEvent.click(getByText('Copy'))
          // @ts-expect-error we are voluntarily based on an older browser spec
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          expect(window.clipboardData.getData()).toBe('Hello')
        },
      },
    ))
})
