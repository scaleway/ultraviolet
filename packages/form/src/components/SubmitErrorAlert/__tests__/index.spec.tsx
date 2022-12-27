import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FORM_ERROR } from 'final-form'
import { Form, Submit, SubmitErrorAlert } from '../..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'

describe('SubmitErrorAlert', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test('should render nothing if no error', () =>
    shouldMatchEmotionSnapshotFormWrapper(<SubmitErrorAlert />))

  test('should display an alert when submitError is present', async () => {
    const onSubmit = jest.fn(() => ({ [FORM_ERROR]: 'hello' }))

    await shouldMatchEmotionSnapshot(
      <Form errors={mockErrors} onRawSubmit={onSubmit}>
        <Submit>Submit</Submit>
        <SubmitErrorAlert />,
      </Form>,
      {
        transform: async ({ getByText }) => {
          await userEvent.click(
            getByText('Submit').closest('button') as HTMLButtonElement,
          )
          await waitFor(() => expect(getByText('hello')).toBeInTheDocument())
        },
      },
    )
  })
})
