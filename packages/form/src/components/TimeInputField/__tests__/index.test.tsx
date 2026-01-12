import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { TimeInputField } from '..'

describe('textInputField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <TimeInputField label="Test" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <TimeInputField label="Test" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events', async () => {
    const onFocus = vi.fn()
    const onChange = vi.fn()
    const onBlur = vi.fn()
    renderWithForm(
      <>
        <TimeInputField
          name="Test"
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
        />
        blur
      </>,
    )

    const hours = screen.getByTestId('hours-input')
    await userEvent.click(hours)
    await userEvent.keyboard('[ArrowUp]')
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledOnce()
    })

    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledOnce()
    })

    await userEvent.click(screen.getByText('blur'))
    expect(onBlur).toHaveBeenCalledOnce()
  })
})
