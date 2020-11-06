import React from 'react'
import { VerificationCode } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('VerificationCode', () => {
  test('renders correctly with default values', () => {
    shouldMatchEmotionSnapshot(<VerificationCode />)
  })

  test('renders correctly with initial value and placeholder and 6 fields', () => {
    shouldMatchEmotionSnapshot(
      <VerificationCode fields={6} initialValue="13" placeholder="0037" />,
    )
  })
})
