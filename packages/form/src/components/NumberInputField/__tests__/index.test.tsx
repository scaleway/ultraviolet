import { act, renderHook, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { NumberInputField, Submit } from '../..'
import { Form } from '../../Form'

describe('numberInputField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <NumberInputField name="test" value={0} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <NumberInputField
        aria-label="Number Input"
        disabled
        name="test"
        value={10}
      />,
    )
    const input = screen.getByLabelText('Number Input')
    expect(input).toBeDisabled()

    const inputMinus = screen.getByLabelText('minus')
    expect(inputMinus).toBeDisabled()

    const inputPlus = screen.getByLabelText('plus')
    expect(inputPlus).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should work fine with form setValue', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useForm<{ test: number | null }>({
        defaultValues: {
          test: 10,
        },
        mode: 'onChange',
      }),
    )

    renderWithTheme(
      <Form
        errors={mockFormErrors}
        methods={result.current}
        onSubmit={value => {
          onSubmit(value)
        }}
      >
        <NumberInputField label="Test" name="test" required />
        <Submit>Submit</Submit>
      </Form>,
    )

    const numberInput = screen.getByLabelText('Test')
    const submit = screen.getByText('Submit')
    expect(numberInput).toHaveValue(10)
    await userEvent.click(submit)
    expect(onSubmit).toHaveBeenCalledWith({
      test: 10,
    })
    await userEvent.clear(numberInput)
    expect(numberInput).toHaveValue(null)
    expect(submit).toBeDisabled()
    act(() => {
      result.current.setValue('test', 40, { shouldValidate: true })
    })
    await waitFor(() => {
      expect(numberInput).toHaveValue(40)
    })
    await userEvent.click(submit)
    await waitFor(() => {
      expect(onSubmit).toHaveBeenNthCalledWith(2, {
        test: 40,
      })
    })
  })
})
