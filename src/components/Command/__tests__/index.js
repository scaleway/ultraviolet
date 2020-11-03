import React from 'react'
import { Command } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

test('Commands renders correctly', () => {
  shouldMatchEmotionSnapshot(<Command>halt</Command>)
})
