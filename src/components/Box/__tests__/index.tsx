import React from 'react'
import Box from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Box', () => {
  test('Box renders correctly ', () => shouldMatchEmotionSnapshot(<Box />))

  // We don't support colors any more with new theme
  test('Box renders with system', () =>
    shouldMatchEmotionSnapshot(<Box height={100} mx="auto" p={2} />))

  test('Box renders with bordered', () =>
    shouldMatchEmotionSnapshot(<Box bordered />))

  test('Box renders with as property', () =>
    shouldMatchEmotionSnapshot(<Box bordered as="p" />))
})
