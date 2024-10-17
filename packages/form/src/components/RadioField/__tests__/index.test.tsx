import { act, screen } from '@testing-library/react'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { RadioField } from '..'

describe('RadioField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <RadioField name="test" value="test" label="Radio field" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with aria-label', () => {
    const { asFragment } = renderWithForm(
      <RadioField name="test" value="test" aria-label="Radio field" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <RadioField
        name="test"
        value="disabled"
        disabled
        label="Radio field disabled"
      />,
    )
    const input = screen.getByRole('radio', { hidden: true })
    expect(input).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly checked', () => {
    const { asFragment } = renderWithForm(
      <RadioField name="test" value="checked" label="Radio field checked" />,
      { defaultValues: { test: 'checked' } },
    )
    const input = screen.getByRole('radio', { hidden: true })
    expect(input).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly', () => {
    const onFocus = vi.fn(() => {})
    const onChange = vi.fn(() => {})
    const onBlur = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <RadioField
        name="test"
        value="events"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        label="Radio field events"
      />,
    )
    const input = screen.getByRole('radio', { hidden: true })
    act(() => input.focus())
    expect(onFocus).toBeCalledTimes(1)
    act(() => input.click())
    expect(onChange).toBeCalledTimes(1)
    act(() => input.blur())
    expect(onBlur).toBeCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  })
})
