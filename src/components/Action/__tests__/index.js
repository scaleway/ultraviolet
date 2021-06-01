import { render } from '@testing-library/react'
import React from 'react'
import Action from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Action', () => {
  test('renders correctly with  name lock and primary variant', () =>
    shouldMatchEmotionSnapshot(<Action name="lock" variant="primary" />))

  test('renders with children ', () =>
    shouldMatchEmotionSnapshot(
      <Action name="lock" variant="primary">
        Test
      </Action>,
    ))

  test('renders with rounded and tooltip', () =>
    shouldMatchEmotionSnapshot(
      <Action name="lock" variant="primary" rounded>
        Test
      </Action>,
    ))

  test('throw an error without name of children props', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    try {
      render(<Action />)
    } catch (e) {
      expect(e).toEqual(
        new Error(
          'Action component need to have either children (as string) or a name prop',
        ),
      )
      expect(console.error).toHaveBeenCalledTimes(2)
    }
    spy.mockRestore()
  })
})
