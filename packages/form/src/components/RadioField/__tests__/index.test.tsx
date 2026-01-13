import { act, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { RadioField } from '..'

describe('radioField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <RadioField label="Radio field" name="test" value="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with aria-label', () => {
    const { asFragment } = renderWithForm(
      <RadioField aria-label="Radio field" name="test" value="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <RadioField
        disabled
        label="Radio field disabled"
        name="test"
        value="disabled"
      />,
    )
    const input = screen.getByRole('radio', { hidden: true })
    expect(input).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly checked', () => {
    const { asFragment } = renderWithForm(
      <RadioField label="Radio field checked" name="test" value="checked" />,
      { defaultValues: { test: 'checked' } },
    )
    const input = screen.getByRole('radio', { hidden: true })
    expect(input).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly', async () => {
    const onFocus = vi.fn(() => {})
    const onChange = vi.fn(() => {})
    const onBlur = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <RadioField
        label="Radio field events"
        name="test"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        value="events"
      />,
    )
    const input = screen.getByRole('radio', { hidden: true })
    act(() => input.focus())
    expect(onFocus).toHaveBeenCalledOnce()
    await userEvent.click(input)
    expect(onChange).toHaveBeenCalledOnce()
    act(() => input.blur())
    expect(onBlur).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
  })
})
