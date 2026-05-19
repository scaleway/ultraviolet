import { act, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { mockFormErrors, renderWithForm } from '@utils/test'
import { describe, expect, vi, it } from 'vitest'
import { NumberInputField, Submit } from '../..'

describe('numberInputField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(<NumberInputField name="test" value={0} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly disabled', () => {
    const { asFragment } = renderWithForm(
      <NumberInputField aria-label="Number Input" disabled name="test" value={10} />,
    )
    const input = screen.getByLabelText('Number Input')
    expect(input).toBeDisabled()

    const inputMinus = screen.getByLabelText('minus')
    expect(inputMinus).toBeDisabled()

    const inputPlus = screen.getByLabelText('plus')
    expect(inputPlus).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work fine with form setValue', async () => {
    const onSubmit = vi.fn()
    const { resultForm } = renderWithForm(
      <>
        <NumberInputField label="Test" name="test" required />
        <Submit>Submit</Submit>
      </>,
      {
        defaultValues: {
          test: 10,
        },
        mode: 'onChange',
      },
      {
        errors: mockFormErrors,
        onSubmit: value => {
          onSubmit(value)
        },
      },
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
      resultForm.current.setValue('test', 40, { shouldValidate: true })
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
