import React from 'react'
import { Command } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Commands', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<Command>halt</Command>)
  })
})
