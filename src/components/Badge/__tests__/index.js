import React from 'react'
import { Badge, badgeVariants, badgeSizes } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Badge', () => {
  test('renders correctly with default values', () => {
    shouldMatchEmotionSnapshot(<Badge>Sample badge</Badge>)
  })

  badgeVariants.forEach(variant => {
    test(`renders correctly variant ${variant}`, () => {
      shouldMatchEmotionSnapshot(<Badge variant={variant}>Sample badge</Badge>)
    })
  })

  badgeSizes.forEach(size => {
    test(`renders correctly size ${size}`, () => {
      shouldMatchEmotionSnapshot(<Badge size={size}>Sample badge</Badge>)
    })
  })
})
