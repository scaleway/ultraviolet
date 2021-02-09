import React from 'react'
import { Box } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Box', () => {
  test('Box renders correctly ', () => {
    shouldMatchEmotionSnapshot(<Box />)
  })

  test('Box renders with system', () => {
    shouldMatchEmotionSnapshot(
      <Box backgroundColor="primary" h={100} mx="auto" p={2} />,
    )
  })
})
