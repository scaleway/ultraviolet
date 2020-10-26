import React from 'react'
import { Dot } from 'components'
import shouldMatchEmotionSnapshot from 'helpers/shouldMatchEmotionSnapshot'

test('Button renders correctly', () => {
  shouldMatchEmotionSnapshot(<Dot>This is hotpink.</Dot>)
})
