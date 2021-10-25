import React from 'react'
import Badge, { badgeSizes, badgeVariants } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Badge', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Badge>Sample badge</Badge>))

  badgeVariants.forEach(variant => {
    test(`renders correctly variant ${variant}`, () =>
      shouldMatchEmotionSnapshot(<Badge variant={variant}>Sample badge</Badge>))
  })

  badgeSizes.forEach(size => {
    test(`renders correctly size ${size}`, () =>
      shouldMatchEmotionSnapshot(<Badge size={size}>Sample badge</Badge>))
  })
})
