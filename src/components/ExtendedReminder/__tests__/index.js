import React from 'react'
import shouldMatchEmotionSnapshot from 'helpers/shouldMatchEmotionSnapshot'
// eslint-disable-next-line import/no-useless-path-segments
import { ExtendedReminder } from '../'

test('ExtendedReminder renders correctly with default values', () => {
  shouldMatchEmotionSnapshot(
    <ExtendedReminder
      icon="alert"
      badgeText="10 days remaining"
      to="/"
      title="Verify your credit card"
      text="Enter the code we send to your bank account to validate your payment method."
      linkText="Verify my credit card"
    />,
  )
})

test('ExtendedReminder renders correctly with variant', () => {
  shouldMatchEmotionSnapshot(
    <ExtendedReminder
      variant="warning"
      icon="alert"
      badgeText="10 days remaining"
      to="/"
      title="Verify your credit card"
      text="Enter the code we send to your bank account to validate your payment method."
      linkText="Verify my credit card"
    />,
  )
})
