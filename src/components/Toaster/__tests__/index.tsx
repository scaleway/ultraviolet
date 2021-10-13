import { createSerializer } from '@emotion/jest'
import { act, screen } from '@testing-library/react'
import React from 'react'
import ToastContainer, { toast } from '..'
import { renderWithTheme } from '../../../helpers/jestHelpers'

// use only class hash (generated from css style content)
expect.addSnapshotSerializer(
  createSerializer({ classNameReplacer: className => className }),
)

describe('Toaster', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  test('renders correctly with all kind of toast', async () => {
    renderWithTheme(<ToastContainer />)
    toast.info('This is an info')
    toast.success('This is a success')
    toast.warn('This is a warning')
    toast.error('This is an error')

    act(() => {
      jest.runAllTimers()
    })
    expect(await screen.findAllByRole('alert')).toMatchSnapshot()
  })
})
