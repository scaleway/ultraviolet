import { act } from '@testing-library/react'
import Counter from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Counter', () => {
  test.each([0, 100, 10000])('renders correctly end=%p', end =>
    shouldMatchEmotionSnapshot(<Counter end={end} />),
  )

  test('renders and execute onEnd', async () => {
    const end = 10
    const mockOnEnd = jest.fn()

    return shouldMatchEmotionSnapshot(<Counter end={end} onEnd={mockOnEnd} />, {
      transform: async () => {
        await act(async () => {
          await new Promise(resolve => {
            setTimeout(() => resolve([]), 2000)
          })
        })
        expect(mockOnEnd).toHaveBeenCalledTimes(1)
      },
    })
  })
})
