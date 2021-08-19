import React from 'react'
import Counter from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Counter', () => {
  test.each([0, 100, 10000])('renders correctly end=%p', end =>
    shouldMatchEmotionSnapshot(<Counter end={end} />),
  )
})
