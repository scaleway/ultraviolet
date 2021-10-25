import React from 'react'
import Box from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Box', () => {
  test('Box renders correctly ', () => shouldMatchEmotionSnapshot(<Box />))

  test('Box renders with system', () =>
    shouldMatchEmotionSnapshot(
      <Box backgroundColor="primary" height={100} mx="auto" p={2} />,
    ))

  test('Box renders with bordered', () =>
    shouldMatchEmotionSnapshot(<Box bordered />))

  test('Box renders with as property', () =>
    shouldMatchEmotionSnapshot(<Box bordered as="p" />))
})
