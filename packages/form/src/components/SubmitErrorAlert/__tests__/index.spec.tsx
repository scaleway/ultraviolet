import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, Submit, SubmitErrorAlert } from '../..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { FORM_ERROR } from '../../../constants'
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
        transform: async () => {
          await userEvent.click(
            // eslint-disable-next-line testing-library/no-node-access
            screen.getByText('Submit').closest('button') as HTMLButtonElement,
          )
          expect(await screen.findByText('hello')).toBeInTheDocument()
        },
      },
    )
  })
})
