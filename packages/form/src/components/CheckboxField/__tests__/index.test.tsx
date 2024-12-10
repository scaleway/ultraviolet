import { act, renderHook, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { CheckboxField } from '../..'
import { Form } from '../../Form'

describe('CheckboxField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(<CheckboxField name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with aria-label', () => {
    const { asFragment } = renderWithForm(
      <CheckboxField name="test" aria-label="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <CheckboxField name="test" disabled />,
    )

    const input = screen.getByRole('checkbox', { hidden: true })
    expect(input).toBeDisabled()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly checked without value', () => {
    const { asFragment } = renderWithForm(<CheckboxField name="checked" />, {
      defaultValues: {
        checked: true,
      },
    })
    const input = screen.getByRole('checkbox', { hidden: true })
    expect(input).toBeChecked()

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly not checked without value', () => {
    const { asFragment } = renderWithForm(<CheckboxField name="checked" />, {
      defaultValues: {},
    })

    const input = screen.getByRole('checkbox', { hidden: true })
    expect(input).not.toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly', () => {
    const onFocus = vi.fn(() => {})
    const onChange = vi.fn(() => {})
    const onBlur = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <CheckboxField
        name="test"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        Checkbox field events
      </CheckboxField>,
    )

    const input = screen.getByRole('checkbox', { hidden: true })
    act(() => input.focus())
    expect(onFocus).toBeCalledTimes(1)
    act(() => input.click())
    expect(onChange).toBeCalledTimes(1)
    act(() => input.blur())
    expect(onBlur).toBeCalledTimes(1)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with errors', async () => {
    const { result } = renderHook(() => useForm({ mode: 'onChange' }))
    const { asFragment } = renderWithTheme(
      <Form
        onSubmit={() => {}}
        errors={mockFormErrors}
        methods={result.current}
      >
        <CheckboxField name="test" required>
          Checkbox field error
        </CheckboxField>
        <div>Focus</div>
      </Form>,
    )

    await userEvent.click(screen.getByRole('checkbox', { hidden: true }))
    // to trigger error
    await userEvent.click(screen.getByRole('checkbox', { hidden: true }))
    await userEvent.click(screen.getByText('Focus'))
    const error = screen.getByText(mockFormErrors.required({ label: '' }))
    expect(error).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })
})
