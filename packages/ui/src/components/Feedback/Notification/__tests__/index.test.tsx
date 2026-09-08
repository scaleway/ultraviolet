import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { act } from 'react'
import { toast } from 'react-toastify'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { NotificationContainer, notification } from '..'

describe('toaster', () => {
  afterEach(() => {
    toast.dismiss()
    vi.clearAllTimers()
  })

  it('locks the default container DOM', () => {
    const { asFragment } = renderWithTheme(<NotificationContainer />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the title, description and close button when closable', async () => {
    renderWithTheme(<NotificationContainer />)
    act(() => {
      notification('Description', 'Title', 'icon', true)
    })

    expect(await screen.findByRole('heading', { name: 'Title' })).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('dismisses the notification when the close button is clicked', async () => {
    renderWithTheme(<NotificationContainer />)
    act(() => {
      notification('Description', 'Title', 'icon', true)
    })

    const toastElement = await screen.findByRole('alert')
    expect(toastElement).toHaveAttribute('data-in', 'true')

    await userEvent.click(screen.getByRole('button', { name: /close/i }))

    expect(toastElement).toHaveAttribute('data-in', 'false')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renders a custom close button and dismisses on click', async () => {
    renderWithTheme(<NotificationContainer />)
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

    const toastElement = await screen.findByRole('alert')
    expect(await screen.findByRole('heading', { name: 'Invitation' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /decline/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /decline/i }))

    expect(toastElement).toHaveAttribute('data-in', 'false')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
