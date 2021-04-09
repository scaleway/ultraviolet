import React from 'react'
import NotificationBar, { notificationVariants } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('NotificationBar', () => {
  test('renders correctly with default values', () => {
    shouldMatchEmotionSnapshot(
      <NotificationBar>Sample NotificationBar</NotificationBar>,
    )
  })

  test('renders correctly with custom icon', () => {
    shouldMatchEmotionSnapshot(
      <NotificationBar icon="eye">Sample NotificationBar</NotificationBar>,
    )
  })

  notificationVariants.forEach(variant => {
    test(`renders correctly variant ${variant}`, () => {
      shouldMatchEmotionSnapshot(
        <NotificationBar variant={variant}>
          Sample NotificationBar
        </NotificationBar>,
      )
    })
  })
})
