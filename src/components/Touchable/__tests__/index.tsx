import React from 'react'
import Touchable from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Touchable', () => {
  test('renders correctly with defaults', () =>
    shouldMatchEmotionSnapshot(<Touchable>Basic Touchable</Touchable>))

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<Touchable disabled>Basic Touchable</Touchable>))

  test('renders correctly on focus', () =>
    shouldMatchEmotionSnapshot(
      <Touchable hasFocus activeOpacity={0.7}>
        Basic Touchable
      </Touchable>,
    ))

  test('renders correctly with a non default as and type', () =>
    shouldMatchEmotionSnapshot(
      <Touchable as="div" type="button">
        Button Touchable
      </Touchable>,
    ))
})
