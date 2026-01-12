import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { OptionSelectorField } from '..'
import {
  firstSelectorOptions,
  secondSelectorOptions,
} from '../__stories__/resources'

describe('optionSelectorField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <OptionSelectorField
        firstSelector={{ label: 'label', options: firstSelectorOptions }}
        name="test"
        secondSelector={{ label: 'Second', options: secondSelectorOptions }}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
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

  test('should trigger events', async () => {
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
