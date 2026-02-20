import { renderWithForm } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { CustomerSatisfactionField } from '..'

describe('customersatisfactionfield', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithForm(
      <CustomerSatisfactionField name="customerSat" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
