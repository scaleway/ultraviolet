import React from 'react'
import Dot from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Dot', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<Dot />))

  test('renders with color', () =>
    shouldMatchEmotionSnapshot(<Dot color="hotpink" />))
})
