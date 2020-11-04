import React from 'react'
import { Alert } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Alert', () => {
  test('Alert renders correctly ', () => {
    shouldMatchEmotionSnapshot(<Alert />)
  })

  test('Alert renders with variant success', () => {
    shouldMatchEmotionSnapshot(<Alert variant="success" />)
  })

  test('Alert renders with variant warning', () => {
    shouldMatchEmotionSnapshot(<Alert variant="warning" />)
  })

  test('Alert renders with variant info', () => {
    shouldMatchEmotionSnapshot(<Alert variant="info" />)
  })

  test('Alert renders with variant success & icon lock', () => {
    shouldMatchEmotionSnapshot(<Alert variant="info" icon="lock" />)
  })
})
