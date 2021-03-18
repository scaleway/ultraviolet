import React from 'react'
import BorderedBox from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('BorderedBox', () => {
  test('renders correctly with default values', () => {
    shouldMatchEmotionSnapshot(<BorderedBox>Sample BorderedBox</BorderedBox>)
  })

  test('renders correctly as a to link', () => {
    shouldMatchEmotionSnapshot(
      <BorderedBox to="/">Link BorderedBox</BorderedBox>,
    )
  })

  test('renders correctly as a href link', () => {
    shouldMatchEmotionSnapshot(
      <BorderedBox href="/">Link BorderedBox</BorderedBox>,
    )
  })

  test('renders correctly as a span', () => {
    shouldMatchEmotionSnapshot(
      <BorderedBox as="span">Span BorderedBox</BorderedBox>,
    )
  })

  test('renders correctly with multiple vertical variant', () => {
    shouldMatchEmotionSnapshot(
      <>
        <BorderedBox variant="vertical">Vertical BorderedBox</BorderedBox>
        <BorderedBox variant="vertical" href="/">
          Vertical BorderedBox
        </BorderedBox>
        <BorderedBox variant="vertical" to="/">
          Vertical BorderedBox
        </BorderedBox>
      </>,
    )
  })
})
