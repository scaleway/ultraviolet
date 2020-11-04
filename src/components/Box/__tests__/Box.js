import React from 'react'
import { Box } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

test('Box renders correctly ', () => {
  shouldMatchEmotionSnapshot(<Box />)
})

test('Box renders with system', () => {
  shouldMatchEmotionSnapshot(
    <Box backgroundColor="primary" height={100} mx="auto" p={2} />,
  )
})
