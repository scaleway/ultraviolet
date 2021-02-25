import React from 'react'
import { Placeholder, placeholderTypes } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Placeholder', () => {
  test.each(placeholderTypes)('renders correctly with type="%s"', type => {
    shouldMatchEmotionSnapshot(<Placeholder type={type} />)
  })
})
