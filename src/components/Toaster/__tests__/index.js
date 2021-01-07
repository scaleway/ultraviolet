import { act, render, screen } from '@testing-library/react'
import serializer from 'jest-emotion'
import React from 'react'
import { ToastContainer, toast } from '..'

expect.addSnapshotSerializer(serializer)

describe('Toaster', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  test('renders correctly with all kind of toast', async () => {
    render(<ToastContainer />)
    toast.info('This is an info')
    toast.success('This is a success')
    toast.warn('This is a warning')
    toast.error('This is an error')

    act(() => jest.runAllTimers())
    expect(await screen.findAllByRole('alert')).toMatchSnapshot()
  })
})
