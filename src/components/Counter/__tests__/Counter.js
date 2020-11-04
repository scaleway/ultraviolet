import React from 'react'
import { Counter } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

test('Counter renders correctly end=0', () => {
  shouldMatchEmotionSnapshot(<Counter end={0} />)
})

test('Counter renders correctly end=100', () => {
  shouldMatchEmotionSnapshot(<Counter end={100} />)
})

test('Counter renders correctly end=10000', () => {
  shouldMatchEmotionSnapshot(<Counter end={100} />)
})
