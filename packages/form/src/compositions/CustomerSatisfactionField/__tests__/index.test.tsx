import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CustomerSatisfactionField } from '..'
import { renderWithForm } from '../../../__tests__/helpers'

describe('customersatisfactionfield', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithForm(<CustomerSatisfactionField name="customerSat" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders five rating buttons', () => {
    renderWithForm(<CustomerSatisfactionField name="customerSat" />)
    expect(screen.getAllByRole('button')).toHaveLength(5)
  })

  it('updates the form value when a rating is clicked', async () => {
    const { resultForm } = renderWithForm(<CustomerSatisfactionField name="customerSat" />)

    await userEvent.click(screen.getAllByRole('button')[3])

    expect(resultForm.current.getValues('customerSat')).toBe(4)
  })
})
