import React from 'react'
import Alert from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Alert', () => {
  test('renders correctly ', () => {
    shouldMatchEmotionSnapshot(<Alert> This text is quite long. </Alert>)
  })

  test('renders with variant success', () => {
    shouldMatchEmotionSnapshot(
      <Alert variant="success"> This text is quite long.</Alert>,
    )
  })

  test('renders with variant warning', () => {
    shouldMatchEmotionSnapshot(
      <Alert variant="warning"> This text is quite long.</Alert>,
    )
  })

  test('renders with variant info', () => {
    shouldMatchEmotionSnapshot(
      <Alert variant="info"> This text is quite long.</Alert>,
    )
  })

  test('renders with different icon size', () => {
    shouldMatchEmotionSnapshot(
      <Alert iconSize={32}> This text is quite long.</Alert>,
    )
  })

  test('renders with variant success & icon lock', () => {
    shouldMatchEmotionSnapshot(
      <Alert variant="info" icon="lock">
        This text is quite long.
      </Alert>,
    )
  })
})
