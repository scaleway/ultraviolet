import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'
import { Alert } from '..'

describe('alert', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => null)
  })

  afterAll(() => {
    vi.restoreAllMocks()
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
    test.each(['danger', 'info', 'success', 'warning', 'neutral'] as const)(
      `renders correctly sentiment %o`,
      sentiment =>
        shouldMatchEmotionSnapshot(
          <Alert sentiment={sentiment}>Sample Alert</Alert>,
        ),
    )
  })

  test(`should render alert and then close it`, async () => {
    renderWithTheme(
      <Alert closable data-testid="alert" onClose={() => 'ok'}>
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
      <Alert buttonText="button" disabled>
        Sample Alert
      </Alert>,
    ))
})
