import { act, screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { NotificationContainer, notification } from '..'

describe('toaster', () => {
  afterEach(() => {
    vi.clearAllTimers()
  })

  it('renders correctly with close button', async () => {
    const { asFragment } = renderWithTheme(<NotificationContainer />)
    act(() => {
      notification('Description', 'Title', 'icon', true)
    })

    await expect(screen.findAllByText('Title')).resolves.toMatchSnapshot()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with custom close button', async () => {
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

    await expect(screen.findAllByText('Decline')).resolves.toMatchSnapshot()
    expect(asFragment()).toMatchSnapshot()
  })
})
