import React from 'react'
import { Badge } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Badge', () => {
  test('renders correctly with default values', () => {
    shouldMatchEmotionSnapshot(<Badge>Sample badge</Badge>)
  })
})
