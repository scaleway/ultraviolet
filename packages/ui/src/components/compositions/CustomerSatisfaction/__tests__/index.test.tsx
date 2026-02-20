import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { CustomerSatisfaction } from '..'

describe('customerSatisfaction', () => {
  it('should work with parameters', () => {
    const { asFragment } = renderWithTheme(
      <CustomerSatisfaction onChange={vi.fn()} value={4} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should check hover and unhover', async () => {
    const { asFragment } = renderWithTheme(
      <CustomerSatisfaction
        data-testid="customer-satisfaction"
        onChange={() => {}}
        value={4}
      />,
    )
    await userEvent.hover(screen.getByTestId('customer-satisfaction-1'))
    await userEvent.unhover(screen.getByTestId('customer-satisfaction-1'))
    expect(asFragment()).toMatchSnapshot()
  })
})
