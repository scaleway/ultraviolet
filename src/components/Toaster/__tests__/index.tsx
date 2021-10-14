import { act, screen } from '@testing-library/react'
import React from 'react'
import ToastContainer, { toast } from '..'
import { shouldMatchEmotionSnapshotWithPortal } from '../../../helpers/jestHelpers'

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
        toast.info('This is an info')
        toast.success('This is a success')
        toast.warn('This is a warning')
        toast.error('This is an error')

        act(() => {
          jest.runAllTimers()
        })

        expect(await screen.findAllByRole('alert')).toMatchSnapshot()
      },
    })
  })
})
