import { act, screen } from '@testing-library/react'
import { consoleLightTheme } from '@ultraviolet/themes'
import { renderWithTheme } from '@utils/test'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ToastContainer, toast } from '..'

describe('Toaster', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  test('renders correctly with all kind of toast', async () => {
    const { asFragment } = renderWithTheme(
      <ToastContainer />,
      consoleLightTheme,
      {
        container: document.body,
      },
    )
    act(() => {
      toast.info('This is an info', {
        toastId: 'info',
      })
    })

    expect(await screen.findByText('This is an info')).toMatchSnapshot()

    act(() => {
      toast.success('This is a success', {
        toastId: 'success',
      })
    })
    expect(await screen.findByText('This is a success')).toMatchSnapshot()

    act(() => {
      toast.error('This is an error', {
        toastId: 'error',
      })
    })

    expect(await screen.findByText('This is an error')).toMatchSnapshot()

    act(() => {
      toast.warning('This is a warning', {
        toastId: 'warning',
      })
    })

    expect(await screen.findByText('This is a warning')).toMatchSnapshot()

    expect(asFragment()).toMatchSnapshot()
  })
})
