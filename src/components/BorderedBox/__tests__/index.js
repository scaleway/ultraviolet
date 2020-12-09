import React from 'react'
import { BorderedBox } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('BorderedBox', () => {
  test('renders correctly with default values', () => {
    shouldMatchEmotionSnapshot(<BorderedBox>Sample BorderedBox</BorderedBox>)
  })
})
