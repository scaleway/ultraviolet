import React from 'react'
import { VerificationCode } from 'components'
import shouldMatchEmotionSnapshot from 'helpers/shouldMatchEmotionSnapshot'

test('VerificationCode renders correctly with default values', () => {
  shouldMatchEmotionSnapshot(<VerificationCode />)
})

test('VerificationCode renders correctly with initial value and placeholder and 6 fields', () => {
  shouldMatchEmotionSnapshot(
    <VerificationCode fields={6} initialValue="13" placeholder="0037" />,
  )
})
