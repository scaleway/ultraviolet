import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, vi, it } from 'vitest'
import { RadioGroupField } from '..'
import { renderWithForm } from '../../../__tests__/helpers'

describe('radioField', () => {
  it('should render correctly checked', async () => {
    const { asFragment } = renderWithForm(
      <RadioGroupField legend="Label" name="radio" onChange={() => {}} value="value-1">
        <RadioGroupField.Radio label="Radio 1" value="value-1" />
        <RadioGroupField.Radio label="Radio 2" value="value-2" />
      </RadioGroupField>,
    )
    const [firstInput, secondInput] = screen.getAllByRole('radio', {
      hidden: true,
    })
    await userEvent.click(secondInput)

    expect(firstInput).not.toBeChecked()
    expect(secondInput).toBeChecked()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger events correctly', async () => {
    const onChange = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <RadioGroupField legend="RadioGroupField events" name="test" onChange={onChange} value="value-2">
        <RadioGroupField.Radio label="Radio 1" value="value-1" />
        <RadioGroupField.Radio label="Radio 2" value="value-2" />
      </RadioGroupField>,
    )
    const input = screen.getAllByRole('radio', { hidden: true })[0]
    await userEvent.click(input)
    expect(onChange).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
  })
})
