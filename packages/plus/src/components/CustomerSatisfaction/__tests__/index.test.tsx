import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { CustomerSatisfaction } from '..'

describe('CustomerSatisfaction', () => {
  it('should work with parameters', () => {
    const { asFragment } = renderWithTheme(
      <CustomerSatisfaction value={4} onChange={vi.fn()} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should check hover and unhover', async () => {
    const { asFragment } = renderWithTheme(
      <CustomerSatisfaction
        value={4}
        onChange={() => {}}
        data-testid="customer-satisfaction"
      />,
    )
    await userEvent.hover(screen.getByTestId('customer-satisfaction-1'))
    await userEvent.unhover(screen.getByTestId('customer-satisfaction-1'))
    expect(asFragment()).toMatchSnapshot()
  })
})
