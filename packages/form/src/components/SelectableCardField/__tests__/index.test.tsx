import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { SelectableCardField } from '../..'

describe('SelectableCardField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardField name="test" value="test">
        Radio field
      </SelectableCardField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardField name="test" value="disabled" disabled>
        Radio field disabled
      </SelectableCardField>,
    )
    const input = screen.getByRole('radio', { hidden: true })
    expect(input).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly checked', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardField name="test" value="checked">
        Radio field checked
      </SelectableCardField>,
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
      <SelectableCardField
        name="test"
        value="events"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        Radio field events
      </SelectableCardField>,
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

  test('should render correctly with errors', async () => {
    const { asFragment } = renderWithForm(
      <>
        <SelectableCardField name="test" value="checked" required>
          Radio field error
        </SelectableCardField>
        <button type="submit">Submit</button>
      </>,
    )
    await userEvent.click(screen.getAllByRole('button')[1])
    const input = screen.getByRole('radio', { hidden: true })
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(asFragment()).toMatchSnapshot()
  })
})
