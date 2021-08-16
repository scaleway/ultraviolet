import React from 'react'
import ExtendedReminder from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('ExtendedReminder', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(
      <ExtendedReminder
        icon="alert"
        badgeText="10 days remaining"
        to="/"
        title="Verify your credit card"
        text="Enter the code we send to your bank account to validate your payment method."
        linkText="Verify my credit card"
      />,
    ))

  test('renders correctly with variant', () =>
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
    ))

  test('renders correctly without link', () =>
    shouldMatchEmotionSnapshot(
      <ExtendedReminder
        variant="warning"
        icon="alert"
        badgeText="10 days remaining"
        title="Verify your credit card"
        text="Enter the code we send to your bank account to validate your payment method."
      />,
    ))
})
