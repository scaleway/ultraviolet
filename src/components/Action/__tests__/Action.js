import React from 'react'
import { create } from 'react-test-renderer'
import { Action } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

test('Action renders correctly with  name lock and primary variant', () => {
  shouldMatchEmotionSnapshot(<Action name="lock" variant="primary" />)
})

test('Action renders with children ', () => {
  shouldMatchEmotionSnapshot(
    <Action name="lock" variant="primary">
      Test
    </Action>,
  )
})

test('Action renders with rounded and tooltip', () => {
  shouldMatchEmotionSnapshot(
    <Action name="lock" variant="primary" rounded>
      Test
    </Action>,
  )
})

test('Throw an error on Action without name of children props', () => {
  try {
    create(<Action />)
  } catch (e) {
    expect(e).toEqual(
      new Error(
        'Action component need to have either children (as string) or a name prop',
      ),
    )
  }
})
