import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals'
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

  test('renders correctly with closable and onClose', () =>
    shouldMatchEmotionSnapshot(
      <Alert closable onClose={() => 'ok'}>
        Sample Alert
      </Alert>,
    ))

  describe(`renders correctly with all sentiments`, () => {
    ;(['info', 'warning', 'danger', 'success'] as const).forEach(sentiment => {
      test(`renders correctly sentiment ${sentiment}`, () =>
        shouldMatchEmotionSnapshot(
          <Alert sentiment={sentiment}>Sample Alert</Alert>,
        ))
    })
  })

  test(`should render alert and then close it`, async () => {
    renderWithTheme(
      <Alert closable onClose={() => 'ok'} data-testid="alert">
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

  test('renders correctly with disabled', () =>
    shouldMatchEmotionSnapshot(
      <Alert disabled buttonText="button">
        Sample Alert
      </Alert>,
    ))
})
