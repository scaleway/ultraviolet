import React from 'react'
import { PhoneInput } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('PhoneInput', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<PhoneInput />)
  })
})
