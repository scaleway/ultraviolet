import { act, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { SelectableCardField } from '../..'

describe('selectableCardField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardField label="test" name="test" value="test">
        Radio field
      </SelectableCardField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardField disabled label="test" name="test" value="disabled">
        Radio field disabled
      </SelectableCardField>,
    )
    const input = screen.getByRole('radio', { hidden: true })
    expect(input).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly checked', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardField label="test" name="test" value="checked">
        Radio field checked
      </SelectableCardField>,
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
      <SelectableCardField
        label="test"
        name="test"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        value="events"
      >
        Radio field events
      </SelectableCardField>,
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

  test('should render correctly with errors', async () => {
    const { asFragment } = renderWithForm(
      <>
        <SelectableCardField label="test" name="test" required value="checked">
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
