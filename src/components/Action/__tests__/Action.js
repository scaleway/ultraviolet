import React from 'react'
import { Action } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

test('Action renders correctly with  name lock and primary variant', () => {
  shouldMatchEmotionSnapshot(<Action name="lock" variant="primary" />)
})
