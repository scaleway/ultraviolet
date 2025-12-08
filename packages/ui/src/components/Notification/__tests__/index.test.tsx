import { act, screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { NotificationContainer, notification } from '..'

describe('toaster', () => {
  afterEach(() => {
    vi.clearAllTimers()
  })

  test('renders correctly with close button', async () => {
    const { asFragment } = renderWithTheme(<NotificationContainer />)
    act(() => {
      notification('Description', 'Title', 'icon', true)
    })

    expect(await screen.findAllByText('Title')).toMatchSnapshot()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom close button', async () => {
    const { asFragment } = renderWithTheme(<NotificationContainer />)
    act(() => {
      notification(
        ({ closeToast }) => (
          <button onClick={closeToast} type="button">
            Decline
          </button>
        ),
        'Invitation',
        'Avatar',
        false,
      )
    })

    expect(await screen.findAllByText('Decline')).toMatchSnapshot()
    expect(asFragment()).toMatchSnapshot()
  })
})
