import userEvent from '@testing-library/user-event'
import { Form, Submit, TextBoxField } from '../..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'

const alpha = /^[a-zA-Z]*$/

describe('Submit', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshotFormWrapper(<Submit>Test</Submit>))

  test('renders correctly with icon and iconPosition ', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <Submit icon="east" iconPosition="right">
        Test
      </Submit>,
    ))

  test('form is invalid', () =>
    shouldMatchEmotionSnapshot(
      <Form
        onRawSubmit={() => {}}
        initialValues={{ toto: '4' }}
        errors={mockErrors}
      >
        <TextBoxField name="toto" regex={[alpha]} />
        <Submit>Test</Submit>
      </Form>,
    ))

  test('form is submitting', async () => {
    mockRandom()

    await shouldMatchEmotionSnapshot(
      <Form
        onRawSubmit={() =>
          new Promise(resolve => {
            setTimeout(() => resolve(undefined), 5000)
          })
        }
        errors={mockErrors}
      >
        <Submit>Test</Submit>
      </Form>,
      {
        transform: async ({ getByText }) => {
          await userEvent.click(
            getByText('Test').closest('button') as HTMLButtonElement,
          )
          expect(
            getByText('Test').closest('button') as HTMLButtonElement,
          ).toBeDisabled()
        },
      },
    )

    restoreRandom()
  })
})
