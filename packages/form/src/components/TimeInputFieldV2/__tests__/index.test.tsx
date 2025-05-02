import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { TimeInputFieldV2 } from '..'

describe('TextInputFieldV2', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <TimeInputFieldV2 label="Test" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <TimeInputFieldV2 label="Test" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events', async () => {
    const onFocus = vi.fn()
    const onChange = vi.fn()
    const onBlur = vi.fn()
    renderWithForm(
      <>
        <TimeInputFieldV2
          name="Test"
          onFocus={onFocus}
          onChange={onChange}
          onBlur={onBlur}
        />
        blur
      </>,
    )

    const hours = screen.getByTestId('hours-input')
    await userEvent.click(hours)
    await userEvent.keyboard('[ArrowUp]')
    await waitFor(() => {
      expect(onChange).toBeCalledTimes(1)
    })

    await waitFor(() => {
      expect(onFocus).toBeCalledTimes(1)
    })

    await userEvent.click(screen.getByText('blur'))
    expect(onBlur).toHaveBeenCalledTimes(1)
  })
})
