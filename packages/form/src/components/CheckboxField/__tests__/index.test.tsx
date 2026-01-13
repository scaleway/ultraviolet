import { act, renderHook, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { CheckboxField } from '../..'
import { Form } from '../../Form'

describe('checkboxField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(<CheckboxField name="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with aria-label', () => {
    const { asFragment } = renderWithForm(
      <CheckboxField aria-label="test" name="test" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <CheckboxField disabled name="test" />,
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

  test('should trigger events correctly', async () => {
    const onFocus = vi.fn(() => {})
    const onChange = vi.fn(() => {})
    const onBlur = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <CheckboxField
        name="test"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      >
        Checkbox field events
      </CheckboxField>,
    )

    const input = screen.getByRole('checkbox', { hidden: true })
    act(() => input.focus())
    expect(onFocus).toHaveBeenCalledOnce()
    await userEvent.click(input)
    expect(onChange).toHaveBeenCalledOnce()
    act(() => input.blur())
    expect(onBlur).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with errors', async () => {
    const { result } = renderHook(() => useForm({ mode: 'onChange' }))
    const { asFragment } = renderWithTheme(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={() => {}}
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
