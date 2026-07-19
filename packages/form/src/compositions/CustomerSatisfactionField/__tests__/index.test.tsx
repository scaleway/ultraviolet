import { describe, expect, it } from 'vitest'
import { CustomerSatisfactionField } from '..'
import { renderWithForm } from '../../../__tests__/helpers'

describe('customersatisfactionfield', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithForm(<CustomerSatisfactionField name="customerSat" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
