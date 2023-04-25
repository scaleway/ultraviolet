import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Alert } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

describe('Alert', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Alert>Sample Alert</Alert>))

  test('renders correctly with children as component', () =>
    shouldMatchEmotionSnapshot(
      <Alert>
        <p>Sample Alert</p>
      </Alert>,
    ))

  test('renders correctly with title', () =>
    shouldMatchEmotionSnapshot(<Alert title="title">Sample Alert</Alert>))

  test('renders correctly with buttonText and onClickButton', () =>
    shouldMatchEmotionSnapshot(
      <Alert buttonText="Button" onClickButton={() => 'ok'}>
        Sample Alert
      </Alert>,
    ))

  test('renders correctly with isClosable and onClose', () =>
    shouldMatchEmotionSnapshot(
      <Alert isClosable onClose={() => 'ok'}>
        Sample Alert
      </Alert>,
    ))

  describe(`renders correctly with all variants`, () => {
    ;(['info', 'warning', 'danger', 'success'] as const).forEach(variant => {
      test(`renders correctly variant ${variant}`, () =>
        shouldMatchEmotionSnapshot(
          <Alert variant={variant}>Sample Alert</Alert>,
        ))
    })
  })

  test(`should render alert and then close it`, async () => {
    renderWithTheme(
      <Alert isClosable onClose={() => 'ok'} data-testid="alert">
        Sample Alert
      </Alert>,
    )

    const alert = screen.getByTestId('alert')
    expect(alert).toBeVisible()

    const closeButton = screen.getByRole('button')
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(alert).not.toBeVisible()
    })
  })
})
