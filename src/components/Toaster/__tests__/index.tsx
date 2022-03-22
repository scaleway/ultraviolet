import { act, screen } from '@testing-library/react'
import React from 'react'
import ToastContainer, { toast } from '..'
import { shouldMatchEmotionSnapshotWithPortal } from '../../../helpers/jestHelpers'

describe('Toaster', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

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

        act(() => {
          jest.runAllTimers()
        })

        expect(await screen.findAllByRole('alert')).toMatchSnapshot()
      },
    })
  })
})
