import React from 'react'
import ActionBar from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('ActionBar', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(<ActionBar>Hello</ActionBar>))

  test('renders correctly with custom rank', () =>
    shouldMatchEmotionSnapshot(<ActionBar rank={2}>I am rank 2</ActionBar>))
})
