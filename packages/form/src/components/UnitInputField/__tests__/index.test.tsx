import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Submit, UnitInputField } from '../..'
import { mockErrors } from '../../../mocks'

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

describe('unitInputField', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <UnitInputField label="Test" name="test" optionName="test2" options={optionsSelect} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should handles onChange and selection', async () => {
    const onSubmit = vi.fn()

    const { asFragment } = renderWithForm(
      <>
        <UnitInputField
          label="Test"
          name="test"
          options={optionsSelect}
          placeholder="input"
          placeholderUnit="select"
          required
        />
        <Submit>Submit</Submit>
      </>,
      {
        defaultValues: {
          test: 10,
        },
        mode: 'onChange',
      },
      {
        errors: mockErrors,
        onSubmit: value => {
          onSubmit(value)
        },
      },
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
