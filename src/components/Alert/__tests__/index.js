import React from 'react'
import Alert, { notificationVariants } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Alert', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Alert>Sample Alert</Alert>))

  test('renders correctly with custom icon', () =>
    shouldMatchEmotionSnapshot(<Alert icon="eye">Sample Alert</Alert>))

  test('renders correctly without background', () =>
    shouldMatchEmotionSnapshot(
      <Alert hasBackground={false}>Sample Alert</Alert>,
    ))

  test('renders correctly with title', () =>
    shouldMatchEmotionSnapshot(<Alert title="title">Sample Alert</Alert>))

  notificationVariants.forEach(variant => {
    test(`renders correctly variant ${variant}`, () =>
      shouldMatchEmotionSnapshot(<Alert variant={variant}>Sample Alert</Alert>))
  })
})
