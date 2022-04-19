import React from 'react'
import Badge, { PROMINENCES, SIZES } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import { SENTIMENTS } from '../../../theme'

describe('Badge', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Badge>Sample badge</Badge>))

  test('renders correctly with icon', () =>
    shouldMatchEmotionSnapshot(
      <Badge icon="information-outline">Sample badge</Badge>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(<Badge disabled>Sample badge</Badge>))

  SENTIMENTS.forEach(variant => {
    test(`renders correctly variant ${variant}`, () =>
      shouldMatchEmotionSnapshot(<Badge variant={variant}>Sample badge</Badge>))
  })

  Object.keys(SIZES).forEach(size => {
    test(`renders correctly size ${size}`, () =>
      shouldMatchEmotionSnapshot(
        <Badge size={size as keyof typeof SIZES}>Sample badge</Badge>,
      ))
  })

  Object.keys(PROMINENCES).forEach(prominence => {
    test(`renders correctly prominence ${prominence}`, () =>
      shouldMatchEmotionSnapshot(
        <Badge prominence={prominence as keyof typeof PROMINENCES}>
          Sample badge
        </Badge>,
      ))
  })
})
