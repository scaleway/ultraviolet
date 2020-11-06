import React from 'react'
import { Alert } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Alert', () => {
  test('renders correctly ', () => {
    shouldMatchEmotionSnapshot(<Alert />)
  })

  test('renders with variant success', () => {
    shouldMatchEmotionSnapshot(<Alert variant="success" />)
  })

  test('renders with variant warning', () => {
    shouldMatchEmotionSnapshot(<Alert variant="warning" />)
  })

  test('renders with variant info', () => {
    shouldMatchEmotionSnapshot(<Alert variant="info" />)
  })

  test('renders with variant success & icon lock', () => {
    shouldMatchEmotionSnapshot(<Alert variant="info" icon="lock" />)
  })
})
