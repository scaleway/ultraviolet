import React from 'react'
import { Dot } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Button', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<Dot>This is hotpink.</Dot>)
  })
})
