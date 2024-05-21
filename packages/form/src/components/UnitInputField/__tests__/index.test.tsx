import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'
import { renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { Submit, UnitInputField } from '../..'
import {
  mockRandom,
  renderWithTheme,
  restoreRandom,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
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
  beforeAll(() => {
    mockRandom()
  })

  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <UnitInputField label="Test" name="test" options={optionsSelect} />,
    ))

  test('should handles onChange and selection', async () => {
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

    const selectBar = screen.getByTestId('select-bar')
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
  })
})
