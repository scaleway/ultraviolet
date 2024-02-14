import { describe, expect, jest, test } from '@jest/globals'
import { renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { Form, Submit, TagInputField } from '../..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'

describe('TagInputField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagInputField name="test" placeholder="placeholder" />,
    ))

  test('should works with initialValues', async () => {
    const onSubmit = jest.fn<(values: { test: string[] }) => void>()
    const { result } = renderHook(() =>
      useForm<{ test: string[] }>({ defaultValues: { test: ['First'] } }),
    )

    renderWithTheme(
      <Form onRawSubmit={onSubmit} errors={mockErrors} methods={result.current}>
        <TagInputField label="Test" name="test" required clearable />
        <Submit>Submit</Submit>
      </Form>,
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
    expect(onSubmit.mock.calls[0][0]).toEqual({
      test: ['First'],
    })
  })
})
