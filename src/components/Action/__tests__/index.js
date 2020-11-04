import React from 'react'
import { create } from 'react-test-renderer'
import { Action } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Action', () => {
  test('renders correctly with  name lock and primary variant', () => {
    shouldMatchEmotionSnapshot(<Action name="lock" variant="primary" />)
  })

  test('renders with children ', () => {
    shouldMatchEmotionSnapshot(
      <Action name="lock" variant="primary">
        Test
      </Action>,
    )
  })

  test('renders with rounded and tooltip', () => {
    shouldMatchEmotionSnapshot(
      <Action name="lock" variant="primary" rounded>
        Test
      </Action>,
    )
  })

  test('Throw an error on Action without name of children props', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    try {
      create(<Action />)
    } catch (e) {
      expect(e).toEqual(
        new Error(
          'Action component need to have either children (as string) or a name prop',
        ),
      )
      expect(console.error).toHaveBeenCalledTimes(1)
    }
    spy.mockRestore()
  })
})
