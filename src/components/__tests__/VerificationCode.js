import React from 'react'
import shouldMatchEmotionSnapshot from 'helpers/shouldMatchEmotionSnapshot'
import { VerificationCode } from '../VerificationCode'

test('VerificationCode renders correctly with default values', () => {
  shouldMatchEmotionSnapshot(<VerificationCode />)
})

test('VerificationCode renders correctly with initial value and placeholder and 6 fields', () => {
  shouldMatchEmotionSnapshot(
    <VerificationCode fields={6} initialValue="13" placeholder="0037" />,
  )
})
