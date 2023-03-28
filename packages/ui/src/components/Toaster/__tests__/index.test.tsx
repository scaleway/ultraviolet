import { act, screen } from '@testing-library/react'
import { ToastContainer, toast } from '..'
import { shouldMatchEmotionSnapshotWithPortal } from '../../../../.jest/helpers'

describe('Toaster', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  test('renders correctly with all kind of toast', async () => {
    await shouldMatchEmotionSnapshotWithPortal(<ToastContainer />, {
      transform: async () => {
        toast.info('This is an info', {
          toastId: 'info',
        })
        toast.success('This is a success', {
          toastId: 'success',
        })
        toast.error('This is an error', {
          toastId: 'error',
        })

        act(() => jest.runAllTimers())

        expect(await screen.findAllByRole('alert')).toMatchSnapshot()
      },
    })
  })
})
