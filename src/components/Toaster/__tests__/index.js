import { createSerializer } from '@emotion/jest'
import { act, screen } from '@testing-library/react'
import React from 'react'
import { ToastContainer, toast } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

expect.addSnapshotSerializer(createSerializer())

describe('Toaster', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  test('renders correctly with all kind of toast', async () => {
    shouldMatchEmotionSnapshot(<ToastContainer />)
    toast.info('This is an info')
    toast.success('This is a success')
    toast.warn('This is a warning')
    toast.error('This is an error')

    act(() => jest.runAllTimers())
    expect(await screen.findAllByRole('alert')).toMatchSnapshot()
  })
})
