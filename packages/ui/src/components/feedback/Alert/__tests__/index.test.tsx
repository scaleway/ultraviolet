import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { Alert } from '..'

describe('alert', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly with default values', () => shouldMatchSnapshot(<Alert>Sample Alert</Alert>))

  it('renders correctly with children as component', () =>
    shouldMatchSnapshot(
      <Alert>
        <p>Sample Alert</p>
      </Alert>,
    ))

  it('renders correctly with title', () => shouldMatchSnapshot(<Alert title="title">Sample Alert</Alert>))

  it('renders correctly with buttonText and onClickButton', () =>
    shouldMatchSnapshot(
      <Alert buttonText="Button" onClickButton={() => 'ok'}>
        Sample Alert
      </Alert>,
    ))

  it('renders correctly with closable and onClose', () =>
    shouldMatchSnapshot(
      <Alert closable onClose={() => 'ok'}>
        Sample Alert
      </Alert>,
    ))

  describe('renders correctly with all sentiments', () => {
    it.each(['danger', 'info', 'success', 'warning', 'neutral'] as const)('renders correctly sentiment %o', sentiment =>
      shouldMatchSnapshot(<Alert sentiment={sentiment}>Sample Alert</Alert>),
    )
  })

  it('should render alert and then close it', async () => {
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

  it('renders correctly with disabled', () =>
    shouldMatchSnapshot(
      <Alert buttonText="button" disabled>
        Sample Alert
      </Alert>,
    ))
  it('renders correctly small', () =>
    shouldMatchSnapshot(
      <Alert className="small" size="small" title="title">
        Sample Alert
      </Alert>,
    ))
})
