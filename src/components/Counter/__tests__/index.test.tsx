import React from 'react'
import Counter from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Counter', () => {
  test.each([0, 100, 10000])('renders correctly end=%p', end =>
    shouldMatchEmotionSnapshot(<Counter end={end} />),
  )
})
