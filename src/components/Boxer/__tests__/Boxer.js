import React from 'react'
import { Boxer } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

test('Boxer renders correctly ', () => {
  shouldMatchEmotionSnapshot(<Boxer />)
})
