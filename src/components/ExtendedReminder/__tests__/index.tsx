import React from 'react'
import ExtendedReminder from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

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

  test('renders correctly with warning variant', () =>
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
  test('renders correctly with error variant', () =>
    shouldMatchEmotionSnapshot(
      <ExtendedReminder
        variant="error"
        icon="alert"
        badgeText="10 days remaining"
        to="/"
        title="Verify your credit card"
        text="Enter the code we send to your bank account to validate your payment method."
        linkText="Verify my credit card"
      />,
    ))
  test('renders correctly with success variant', () =>
    shouldMatchEmotionSnapshot(
      <ExtendedReminder
        variant="success"
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

  test('renders correctly with custom link', () =>
    shouldMatchEmotionSnapshot(
      <ExtendedReminder
        variant="warning"
        icon="alert"
        badgeText="10 days remaining"
        title="Verify your credit card"
        text="Enter the code we send to your bank account to validate your payment method."
        CustomLink={<div>Custom Link</div>}
      />,
    ))
})
