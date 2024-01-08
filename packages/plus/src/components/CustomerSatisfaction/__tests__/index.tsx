import { describe, it, jest } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CustomerSatisfaction } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('CustomerSatisfaction', () => {
  it('should work with parameters', () =>
    shouldMatchEmotionSnapshot(
      <CustomerSatisfaction value={4} onChange={jest.fn<any>()} />,
    ))

  it('should check hover and unhover', async () => {
    await shouldMatchEmotionSnapshot(
      <CustomerSatisfaction
        value={4}
        onChange={() => {}}
        data-testid="customer-satisfaction"
      />,
      {
        transform: async () => {
          await userEvent.hover(screen.getByTestId('customer-satisfaction-1'))
          await userEvent.unhover(screen.getByTestId('customer-satisfaction-1'))
        },
      },
    )
  })
})
