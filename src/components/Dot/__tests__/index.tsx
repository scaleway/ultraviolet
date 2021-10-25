import React from 'react'
import Dot from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Dot', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<Dot>This is a dot.</Dot>))

  test('renders with color', () =>
    shouldMatchEmotionSnapshot(<Dot color="hotpink">This is hotpink.</Dot>))
})
