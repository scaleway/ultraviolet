import React from 'react'
import BorderedBox from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('BorderedBox', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<BorderedBox />))
  test('renders correctly with children', () =>
    shouldMatchEmotionSnapshot(<BorderedBox>Hello World</BorderedBox>))
})
