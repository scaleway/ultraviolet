import React from 'react'
import Counter from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Counter', () => {
  test('renders correctly end=0', () => {
    shouldMatchEmotionSnapshot(<Counter end={0} />)
  })

  test('renders correctly end=100', () => {
    shouldMatchEmotionSnapshot(<Counter end={100} />)
  })

  test('renders correctly end=10000', () => {
    shouldMatchEmotionSnapshot(<Counter end={100} />)
  })
})
