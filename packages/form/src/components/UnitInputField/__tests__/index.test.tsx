import { describe, expect, jest, test } from '@jest/globals'
import { renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { UnitInputField } from '..'
import { Submit } from '../..'
import {
  renderWithTheme,
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
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <UnitInputField label="Test" name="test" options={optionsSelect} />,
    ))

  test('should render correctly generated', async () => {
    const onSubmit = jest.fn<(values: { test: string | null }) => void>()
    const { result } = renderHook(() =>
      useForm<{ test: string | null }>({ defaultValues: { test: null } }),
    )

    renderWithTheme(
      <Form onRawSubmit={onSubmit} errors={mockErrors} methods={result.current}>
        <UnitInputField
          label="Test"
          name="test"
          required
          options={optionsSelect}
        />
        <Submit>Submit</Submit>
      </Form>,
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
    const textInput = screen.getByLabelText('Test')
    await userEvent.type(textInput, 'This is an example')
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toEqual({
        test: 'This is an example',
      })
    })
  })
})
