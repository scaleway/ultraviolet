import React from 'react'
import { availableIcons, MenuIcon } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('MenuIcon', () => {
  availableIcons.map(icon =>
    test(`render simple ${icon}`, () => {
      shouldMatchEmotionSnapshot(<MenuIcon name={icon} />)
    }),
  )

  test(`render simple isButton`, () => {
    shouldMatchEmotionSnapshot(<MenuIcon name="billing" isButton />)
  })
})
