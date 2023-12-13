import { describe, expect, jest, test } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextInputField } from '..'
import { Submit } from '../..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

describe('TextInputFieldV2', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TextInputField label="Test" name="test" />,
    ))

  test('should render correctly generated', async () => {
    const onSubmit = jest.fn<(values: { test: string }) => void>()

    renderWithTheme(
      <Form onRawSubmit={onSubmit} errors={mockErrors}>
        <TextInputField label="Test" name="test" required clearable />
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
