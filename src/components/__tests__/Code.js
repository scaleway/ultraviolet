import React from 'react'
import shouldMatchEmotionSnapshot from 'helpers/shouldMatchEmotionSnapshot'
import { Code } from '../Code'

test('Code renders correctly with default values', () => {
  shouldMatchEmotionSnapshot(<Code />)
})

test('Code renders correctly with initial value and placeholder and 6 fields', () => {
  shouldMatchEmotionSnapshot(
    <Code fields={6} initialValue="13" placeholder="0037" />,
  )
})
