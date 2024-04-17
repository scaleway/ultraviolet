import { describe, expect, jest, test } from '@jest/globals'
import { act, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { NumberInputFieldV2, Submit } from '../..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

describe('NumberInputFieldV2', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <NumberInputFieldV2 name="test" value={0} />,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <NumberInputFieldV2
        name="test"
        value={10}
        disabled
        aria-label="Number Input"
      />,
      {
        transform: () => {
          const input = screen.getByLabelText('Number Input')
          expect(input).toBeDisabled()

          const inputMinus = screen.getByLabelText('minus')
          expect(inputMinus).toBeDisabled()

          const inputPlus = screen.getByLabelText('plus')
          expect(inputPlus).toBeDisabled()
        },
      },
    ))

  test('should work fine with form setValue', async () => {
    const onSubmit = jest.fn<(values: { test: number | null }) => void>()
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
        onRawSubmit={value => onSubmit(value)}
        errors={mockErrors}
        methods={result.current}
      >
        <NumberInputFieldV2 label="Test" name="test" required />
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
