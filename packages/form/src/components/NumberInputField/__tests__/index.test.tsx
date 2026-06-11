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
    const input = screen.getByRole('spinbutton', { name: 'Number Input' })
    expect(input).toBeDisabled()

    const inputMinus = screen.getByRole('button', { name: 'minus' })
    expect(inputMinus).toBeDisabled()

    const inputPlus = screen.getByRole('button', { name: 'plus' })
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

    const numberInput = screen.getByRole('spinbutton', { name: 'Test' })
    const submit = screen.getByRole('button', { name: 'Submit' })
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

    const numberInput1 = screen.getByRole('spinbutton', { name: 'Test1' })
    const numberInput2 = screen.getByRole('spinbutton', { name: 'Test2' })

    const submit = screen.getByRole('button', { name: 'Submit' })
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

  describe('validators', () => {
    it('should pass validation for valid numbers', async () => {
      const onSubmit = vi.fn()
      renderWithForm(
        <>
          <NumberInputField aria-label="Test" name="test" />
          <Submit>Submit</Submit>
        </>,
        { defaultValues: { test: 0 }, mode: 'onChange' },
        { errors: mockFormErrors, onSubmit },
      )

      const input = screen.getByRole('spinbutton', { name: 'Test' })
      const submit = screen.getByRole('button', { name: 'Submit' })

      await userEvent.type(input, '42')
      await userEvent.click(submit)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ test: 42 })
      })
    })

    it('should fail validation when value is not a decimal number', async () => {
      const onSubmit = vi.fn()
      renderWithForm(
        <>
          <NumberInputField aria-label="Test" name="test" />
          <Submit>Submit</Submit>
        </>,
        { defaultValues: { test: 0 }, mode: 'onChange' },
        { errors: mockFormErrors, onSubmit },
      )

      const input = screen.getByRole('spinbutton', { name: 'Test' })
      const submit = screen.getByRole('button', { name: 'Submit' })

      await userEvent.type(input, 'e')
      await userEvent.click(submit)

      await waitFor(() => {
        expect(input).toHaveAccessibleDescription('This field should be a number')
        expect(onSubmit).not.toHaveBeenCalled()
      })
    })

    it('should pass validation for decimal numbers when step is decimal', async () => {
      const onSubmit = vi.fn()
      renderWithForm(
        <>
          <NumberInputField aria-label="Test" name="test" step={0.1} />
          <Submit>Submit</Submit>
        </>,
        { defaultValues: { test: 0 }, mode: 'onChange' },
        { errors: mockFormErrors, onSubmit },
      )

      const input = screen.getByRole('spinbutton', { name: 'Test' })
      const submit = screen.getByRole('button', { name: 'Submit' })

      await userEvent.type(input, '3.14')
      await userEvent.click(submit)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ test: 3.14 })
      })
    })

    it('should fail validation for decimal numbers when step is integer', async () => {
      const onSubmit = vi.fn()
      renderWithForm(
        <>
          <NumberInputField aria-label="Test" name="test" step={2} />
          <Submit>Submit</Submit>
        </>,
        { defaultValues: { test: 0 }, mode: 'onChange' },
        { errors: mockFormErrors, onSubmit },
      )

      const input = screen.getByRole('spinbutton', { name: 'Test' })
      const submit = screen.getByRole('button', { name: 'Submit' })

      await userEvent.type(input, '3.14')
      await userEvent.click(submit)

      await waitFor(() => {
        expect(input).toHaveAccessibleDescription('This field should be an integer')
        expect(onSubmit).not.toHaveBeenCalled()
      })

      await userEvent.clear(input)
      await userEvent.type(input, '4')
      await userEvent.click(submit)

      await waitFor(() => {
        expect(input).toHaveAccessibleDescription('')
        expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ test: 4 })
      })
    })
  })
})
