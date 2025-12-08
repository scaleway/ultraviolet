import { act, screen } from '@testing-library/react'
import { consoleLightTheme } from '@ultraviolet/themes'
import { renderWithTheme } from '@utils/test'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { Toast, ToastContainer, toast } from '..'

describe('toaster', () => {
  afterEach(() => {
    vi.clearAllTimers()
  })

  describe('components', () => {
    test('renders correctly Toast.Button', () => {
      const { asFragment } = renderWithTheme(<Toast.Button>Test</Toast.Button>)

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders correctly Toast.Button and variant ghost', () => {
      const { asFragment } = renderWithTheme(
        <Toast.Button variant="ghost">Test</Toast.Button>,
      )

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders correctly Toast.Link', () => {
      const { asFragment } = renderWithTheme(
        <Toast.Link href="scaleway.com">Test</Toast.Link>,
      )

      expect(asFragment()).toMatchSnapshot()
    })
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
