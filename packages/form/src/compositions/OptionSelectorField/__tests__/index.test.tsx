import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { OptionSelectorField } from '..'
import { renderWithForm } from '../../../__tests__/helpers'
import { firstSelectorOptions, secondSelectorOptions } from '../__stories__/resources'

describe('optionSelectorField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <OptionSelectorField
        firstSelector={{ label: 'label', options: firstSelectorOptions }}
        name="test"
        secondSelector={{ label: 'Second', options: secondSelectorOptions }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <OptionSelectorField
        disabled
        firstSelector={{ label: 'label', options: firstSelectorOptions }}
        name="test"
        secondSelector={{ label: 'Second', options: secondSelectorOptions }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should trigger events', async () => {
    const onChange = vi.fn()

    const { asFragment } = renderWithForm(
      <OptionSelectorField
        firstSelector={{ label: 'label', options: firstSelectorOptions }}
        name="test"
        onChange={onChange}
        secondSelector={{ label: 'Second', options: secondSelectorOptions }}
      />,
    )
    const select = screen.getByTestId('first-selector')
    await userEvent.click(select)
    const option = screen.getByTestId('option-ubuntu')

    await userEvent.click(option)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce()
    })

    expect(asFragment()).toMatchSnapshot()
  })
})
