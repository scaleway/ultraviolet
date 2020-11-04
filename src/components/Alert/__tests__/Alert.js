import React from 'react'
import { Alert } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

test('Alert renders correctly ', () => {
  shouldMatchEmotionSnapshot(<Alert />)
})

test('Alert renders with variant success', () => {
  shouldMatchEmotionSnapshot(<Alert vairant="success" />)
})

test('Alert renders with variant warning', () => {
  shouldMatchEmotionSnapshot(<Alert vairant="warning" />)
})

test('Alert renders with variant info', () => {
  shouldMatchEmotionSnapshot(<Alert vairant="info" />)
})

test('Alert renders with variant success & icon lock', () => {
  shouldMatchEmotionSnapshot(<Alert vairant="info" icon="lock" />)
})
