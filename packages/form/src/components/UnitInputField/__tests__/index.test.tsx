import { renderHook, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm, renderWithTheme } from '@utils/test'
import { useForm } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { Submit, UnitInputField } from '../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

const optionsSelect = [
  {
    label: 'Seconds',
    value: 'seconds',
  },
  {
    label: 'Days',
    value: 'days',
  },
  {
    label: 'Months',
    value: 'months',
  },
]

describe('UnitInputField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <UnitInputField label="Test" name="test" options={optionsSelect} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should handles onChange and selection', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useForm<{ test: number | null }>({
        defaultValues: {
          test: 10,
        },
        mode: 'onChange',
      }),
    )

    const { asFragment } = renderWithTheme(
      <Form
        onSubmit={value => onSubmit(value)}
        errors={mockErrors}
        methods={result.current}
      >
        <UnitInputField
          label="Test"
          name="test"
          required
          options={optionsSelect}
          placeholder="input"
          placeholderUnit="select"
        />
        <Submit>Submit</Submit>
      </Form>,
    )

    const selectBar = screen.getByTestId('select-input-test-unit')
    const numberInput = screen.getByTestId('unit-input')
    const submit = screen.getByText('Submit')
    await userEvent.click(selectBar)
    await userEvent.click(screen.getByText('Days'))
    await userEvent.click(numberInput)
    await userEvent.keyboard('0')
    await userEvent.click(submit)

    expect(onSubmit).toHaveBeenCalledWith({
      test: 100,
      'test-unit': 'days',
    })

    expect(asFragment()).toMatchSnapshot()
  })
})
