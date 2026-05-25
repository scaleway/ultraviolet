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
      resultForm.current.setValue('test', 42, { shouldValidate: true })
    })
    await waitFor(() => {
      expect(numberInput).toHaveValue(42)
    })
    await waitFor(() => {
      expect(submit).not.toBeDisabled()
    })

    await userEvent.click(submit)
    await waitFor(() => {
      expect(onSubmit).toHaveBeenNthCalledWith(2, {
        test: 42,
      })
    })
  })

  it('should work fine with form setValues', async () => {
    const onSubmit = vi.fn()
    type FormValues = {
      test1: number | null
      test2: number | null
    }

    const { resultForm } = renderWithForm(
      <>
        <NumberInputField label="Test1" name="test1" required />
        <NumberInputField label="Test2" name="test2" required />
        <Submit>Submit</Submit>
      </>,
      {
        defaultValues: {
          test1: 10,
          test2: 20,
        } satisfies FormValues,
        mode: 'onChange',
      },
      {
        errors: mockFormErrors,
        onSubmit,
      },
    )

    const numberInput1 = screen.getByLabelText('Test1')
    const numberInput2 = screen.getByLabelText('Test2')

    const submit = screen.getByText('Submit')
    expect(numberInput1).toHaveValue(10)
    await userEvent.click(submit)

    expect(onSubmit).toHaveBeenCalledWith({
      test1: 10,
      test2: 20,
    } satisfies FormValues)

    await userEvent.clear(numberInput1)
    await userEvent.clear(numberInput2)
    expect(numberInput1).toHaveValue(null)
    expect(numberInput2).toHaveValue(null)
    expect(submit).toBeDisabled()

    await waitFor(() => {
      expect(resultForm.current.formState.isReady).toBe(true)
    })

    act(() => {
      resultForm.current.setValues(
        {
          test1: 11,
          test2: 21,
        },
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        },
      )
    })

    // Wait for the form state to update
    await waitFor(() => {
      expect(resultForm.current.formState.isValidating).toBe(false)
    })

    act(() => {
      resultForm.current.handleSubmit(data => {
        expect(data).toStrictEqual({
          test1: 11,
          test2: 21,
        } satisfies FormValues)
      })
    })

    //  Wait for DOM to re-render with new values
    await waitFor(() => {
      expect(numberInput1).toHaveValue(11)
      expect(numberInput2).toHaveValue(21)
    })

    await waitFor(() => {
      expect(submit).toBeEnabled()
    })

    await waitFor(async () => {
      await userEvent.click(submit)
    })

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        test1: 11,
        test2: 21,
      })
    })
  })
})
