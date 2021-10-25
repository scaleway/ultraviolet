import React from 'react'
import Pentagon from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Pentagon', () => {
  test(`renders with default props`, () =>
    shouldMatchEmotionSnapshot(<Pentagon />))
  test(`renders with children`, () =>
    shouldMatchEmotionSnapshot(<Pentagon>X</Pentagon>))
  test(`renders with custom color`, () =>
    shouldMatchEmotionSnapshot(<Pentagon color="yellow">X</Pentagon>))
  test(`renders with custom size`, () =>
    shouldMatchEmotionSnapshot(<Pentagon size="200px">X</Pentagon>))
})
