import React from 'react'
import Notice from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Notice', () => {
  test(`renders correctly with default props`, () => {
    shouldMatchEmotionSnapshot(<Notice>Hello</Notice>)
  })
})
