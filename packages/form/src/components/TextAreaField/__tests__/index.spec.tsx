import { describe, expect, jest, test } from '@jest/globals'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextAreaField } from '..'
import { Submit } from '../..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

describe('TextAreaField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TextAreaField label="Test" name="test" />,
    ))

  test('should render correctly generated', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = jest.fn<any>()

    renderWithTheme(
      <Form onRawSubmit={onSubmit} errors={mockErrors}>
        <TextAreaField label="Test" name="test" required clearable />
        <Submit>Submit</Submit>
      </Form>,
    )

    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0)
    })
    const textareaInput = screen.getByLabelText('Test')
    await userEvent.type(textareaInput, 'This is an example')
    await userEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(onSubmit.mock.calls[0][0]).toEqual({
        test: 'This is an example',
      })
    })
  })
})
