import React from 'react'
import Counter from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Counter', () => {
  test.each`
    end
    ${0}
    ${100}
    ${10000}
  `('renders correctly end=$end', ({ end }) =>
    shouldMatchEmotionSnapshot(<Counter end={end} />),
  )
})
